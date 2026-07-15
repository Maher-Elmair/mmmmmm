// ─────────────────────────────────────────────────────────────────────────────
// Offline-First Sync Engine.
//
// Responsibilities
//  • Track online/offline + sync status with a tiny pub/sub.
//  • On sign-in:  pull tasks/sessions/settings/notifications from Supabase,
//                 LWW-merge into local store, then flush queued local mutations.
//  • On sign-out: stop listeners and clear status.
//  • Listen to `online` / `visibilitychange` to retry the queue.
//
// Public API is kept stable for existing UI imports (status hooks, account
// panel toggle, migration dialog). Stubs remain for the migration handler so
// older callers still compile while the migration path is being rebuilt.
// ─────────────────────────────────────────────────────────────────────────────

import { useRootStore as useStore } from '@/app/stores/rootStore'
import type { Task } from '@/app/domain/tasks/task.types'
import { isUuid, newUuid, pullTasks, pushTaskOp } from './tasksSync'
import { pushSessionOp, pushCycleOp } from './sessionsSync'
import { pushNotificationOp, pullNotifications } from './notificationsSync'
import { pushSettingsOp, pushProfileOp, pullSettings } from './settingsSync'
import { startRealtime, stopRealtime, markLocalEcho } from './realtime'
import { enqueue, markOpError, queueSize, readQueue, removeOp, writeQueue, type SyncEntity, type SyncOp, type SyncOpType } from './syncQueue'
import { pullSessions } from './sessionsSync'
import { computeStreak, computeTotalSessions } from '@/app/domain/stats/stats.rules'

// ── Public types (kept stable) ──────────────────────────────────────────────

export type SyncStatus =
  | 'idle'
  | 'syncing'
  | 'synced'
  | 'error'
  | 'offline'
  | 'disabled'

export interface SyncStateSnapshot {
  status: SyncStatus
  lastSyncedAt: number | null
  pending: number
}

type StatusListener = (snapshot: SyncStateSnapshot) => void

// ── Internal state ──────────────────────────────────────────────────────────

const ENABLED_KEY = 'focusflow:cloudSyncEnabled'

let current: SyncStateSnapshot = {
  status: 'disabled',
  lastSyncedAt: null,
  pending: 0,
}
const listeners = new Set<StatusListener>()

let activeUserId: string | null = null
let syncVersion = 0
let flushing = false
let onlineHandler: (() => void) | null = null
let visibilityHandler: (() => void) | null = null
let enabled = readEnabledFlag()

function readEnabledFlag(): boolean {
  if (typeof window === 'undefined') return true
  const v = window.localStorage.getItem(ENABLED_KEY)
  return v === null ? true : v === '1'
}

function writeEnabledFlag(v: boolean) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ENABLED_KEY, v ? '1' : '0')
}

function setState(patch: Partial<SyncStateSnapshot>) {
  const next = { ...current, ...patch }
  const changed =
    next.status !== current.status ||
    next.lastSyncedAt !== current.lastSyncedAt ||
    next.pending !== current.pending
  current = next
  if (!changed) return
  listeners.forEach((l) => {
    try {
      l(current)
    } catch {
      /* ignore */
    }
  })
}

function refreshPending() {
  if (!activeUserId) return setState({ pending: 0 })
  setState({ pending: queueSize(activeUserId) })
}

// ── Public status API ───────────────────────────────────────────────────────

export function getSyncStatus(): SyncStateSnapshot {
  return current
}

export function subscribeSyncStatus(listener: StatusListener): () => void {
  listeners.add(listener)
  listener(current)
  return () => {
    listeners.delete(listener)
  }
}

export function isCloudSyncEnabled(): boolean {
  return enabled
}

export async function setCloudSyncEnabled(
  value: boolean,
  userId?: string | null,
): Promise<void> {
  enabled = value
  writeEnabledFlag(value)
  if (!value) {
    await stopSync()
    setState({ status: 'disabled' })
    return
  }
  if (userId) await startSync(userId)
}

// ── Mutation enqueue (called from store actions) ────────────────────────────

export function enqueueOp(
  entity: SyncEntity,
  type: SyncOpType,
  entityId: string,
  payload: unknown,
): void {
  if (!enabled || !activeUserId) return
  enqueue(activeUserId, {
    entity,
    type,
    entityId,
    payload: payload ?? {},
    clientUpdatedAt: new Date().toISOString(),
  })
  // Suppress the realtime echo of our own change so the UI doesn't flicker
  // when the server round-trips the row back to us.
  markLocalEcho(entity, entityId)
  refreshPending()
  // Fire-and-forget flush; will no-op if offline or already flushing.
  void flushQueue()
}

// Back-compat alias — existing callers keep working.
export function enqueueTaskOp(
  type: SyncOpType,
  entityId: string,
  payload: unknown,
): void {
  enqueueOp('task', type, entityId, payload)
}

async function pushOp(userId: string, op: SyncOp): Promise<void> {
  switch (op.entity) {
    case 'task':
      return pushTaskOp(userId, op)
    case 'session':
      return pushSessionOp(userId, op)
    case 'cycle':
      return pushCycleOp(userId, op)
    case 'notification':
      return pushNotificationOp(userId, op)
    case 'setting':
      return pushSettingsOp(userId, op)
    case 'profile':
      return pushProfileOp(userId, op)
  }
}

// ── Start / stop ────────────────────────────────────────────────────────────

export async function startSync(userId?: string | null): Promise<void> {
  if (!userId) return
  if (!enabled) {
    setState({ status: 'disabled' })
    return
  }

  activeUserId = userId
  const myVersion = ++syncVersion
  setState({ status: 'syncing' })

  // Normalise any local tasks with non-uuid ids so they can sync.
  normalizeLocalTaskIds()

  // 1) Pull, merge, then 2) flush queue, then 3) subscribe to realtime.
  // Hold flushing=true during the pull+merge window so enqueueOp-triggered
  // fire-and-forget flushes can't race with the startup sequence.
  flushing = true
  try {
    await pullAndMerge(userId)
    if (syncVersion !== myVersion) return // a newer startSync superseded us
    await pullSecondary(userId)
    if (syncVersion !== myVersion) return
    flushing = false
    await flushQueue()
    if (syncVersion !== myVersion) return
    await startRealtime(userId)
    setState({ status: isOnline() ? 'synced' : 'offline', lastSyncedAt: Date.now() })
  } catch (e) {
    console.error('[sync] start failed', e)
    setState({ status: isOnline() ? 'error' : 'offline' })
  } finally {
    flushing = false
  }

  // Wire retry triggers.
  if (typeof window !== 'undefined') {
    onlineHandler = () => {
      void flushQueue()
    }
    visibilityHandler = () => {
      if (document.visibilityState === 'visible') void flushQueue()
    }
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', handleOffline)
    document.addEventListener('visibilitychange', visibilityHandler)
  }
}

function handleOffline() {
  setState({ status: 'offline' })
}

export async function stopSync(): Promise<void> {
  activeUserId = null
  ++syncVersion // cancel any in-flight startSync
  stopRealtime()
  if (typeof window !== 'undefined') {
    if (onlineHandler) window.removeEventListener('online', onlineHandler)
    window.removeEventListener('offline', handleOffline)
    if (visibilityHandler)
      document.removeEventListener('visibilitychange', visibilityHandler)
    onlineHandler = null
    visibilityHandler = null
  }
  setState({ status: 'disabled', pending: 0 })
}

// ── Internals ───────────────────────────────────────────────────────────────

function isOnline(): boolean {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine !== false
}

function normalizeLocalTaskIds() {
  const state = useStore.getState()
  let changed = false
  const mapping = new Map<string, string>()
  const tasks = state.tasks.map((t) => {
    if (isUuid(t.id)) return t
    const next = newUuid()
    mapping.set(t.id, next)
    changed = true
    return { ...t, id: next }
  })
  if (!changed) return
  const activeTaskId = state.activeTaskId
    ? mapping.get(state.activeTaskId) ?? state.activeTaskId
    : state.activeTaskId
  useStore.setState({ tasks, activeTaskId })
}

async function pullAndMerge(userId: string) {
  const serverTasks = await pullTasks(userId)
  const local = useStore.getState().tasks as (Task & { updatedAt?: string })[]
  const byId = new Map<string, Task & { updatedAt?: string }>()
  local.forEach((t) => byId.set(t.id, t))

  // Tasks present locally but not on server: keep + enqueue create (they were
  // authored before sync started, or while offline).
  const serverIds = new Set(serverTasks.map((t) => t.id))
  local.forEach((t, idx) => {
    if (!serverIds.has(t.id)) {
      enqueue(userId, {
        entity: 'task',
        type: 'create',
        entityId: t.id,
        payload: { ...t, position: idx, updatedAt: t.updatedAt ?? t.createdAt },
        clientUpdatedAt: t.updatedAt ?? t.createdAt,
      })
    }
  })

  // Apply server rows with LWW.
  serverTasks.forEach((srv) => {
    const loc = byId.get(srv.id)
    if (!loc) {
      byId.set(srv.id, srv)
      return
    }
    const locUpdated = loc.updatedAt ?? loc.createdAt
    if (srv.updatedAt >= locUpdated) {
      byId.set(srv.id, srv)
    } // else local wins; existing queued op will push it.
  })

  const merged = Array.from(byId.values())
  useStore.setState({ tasks: merged })
  refreshPending()
}

async function pullSecondary(userId: string): Promise<void> {
  // Notifications: last-write-wins by id — server rows replace local ones, and
  // any local-only notifications remain (they'll push up via the queue).
  try {
    const [remoteNotifs, remoteSettings, remoteSessions] = await Promise.all([
      pullNotifications(userId),
      pullSettings(userId),
      pullSessions(userId),
    ])
    const state = useStore.getState()

    // Merge session history: server sessions replace local hist-* entries by
    // matching completedAt+taskId+mode within a 5-second window. Local-only
    // entries (not yet synced) are preserved.
    const seen = new Set<string>()
    const mergedSessions: typeof state.sessionHistory = []
    for (const remote of remoteSessions) {
      const localMatch = state.sessionHistory.find((l) =>
        l.id.startsWith('hist-') &&
        l.taskId === remote.taskId &&
        l.mode === remote.mode &&
        Math.abs(new Date(l.completedAt).getTime() - new Date(remote.completedAt).getTime()) < 5000,
      )
      if (localMatch) {
        // Replace local hist-* ID with the Supabase UUID.
        mergedSessions.push({ ...localMatch, id: remote.id })
        seen.add(localMatch.id)
      } else if (!state.sessionHistory.some((l) => l.id === remote.id)) {
        mergedSessions.push(remote)
        seen.add(remote.id)
      }
    }
    // Preserve local-only entries that weren't matched.
    for (const local of state.sessionHistory) {
      if (!seen.has(local.id)) mergedSessions.push(local)
    }

    // Resolve task titles from local tasks store. pullSessions returns null
    // titles; match by taskId against the tasks we just merged.
    const taskTitleById = new Map(state.tasks.map((t) => [t.id, t.title]))
    const resolvedSessions = mergedSessions.map((s) =>
      s.taskTitle === null && s.taskId
        ? { ...s, taskTitle: taskTitleById.get(s.taskId) ?? null }
        : s,
    )

    const patch: Partial<ReturnType<typeof useStore.getState>> = {
      sessionHistory: resolvedSessions.slice(0, 200),
      notifications: [...remoteNotifs, ...state.notifications.filter((n) => !new Set(remoteNotifs.map((r) => r.id)).has(n.id))].slice(0, 50),
    }

    if (remoteSettings) {
      patch.settings = remoteSettings.settings
      if (remoteSettings.dailyGoal !== undefined) patch.dailyGoal = remoteSettings.dailyGoal
      if (remoteSettings.weeklyGoal !== undefined) patch.weeklyGoal = remoteSettings.weeklyGoal
      if (remoteSettings.monthlyGoal !== undefined) patch.monthlyGoal = remoteSettings.monthlyGoal
      if (remoteSettings.soundVolume !== undefined) patch.soundVolume = remoteSettings.soundVolume
      if (remoteSettings.activeSounds !== undefined)
        patch.activeSounds = remoteSettings.activeSounds
      if (remoteSettings.userName !== undefined) patch.userName = remoteSettings.userName

      // Hydrate remote timer state (only if it came from a different device).
      const t = remoteSettings.activeTimer
      const myDevice =
        typeof window !== 'undefined'
          ? window.localStorage.getItem('focusflow:deviceId')
          : null
      const localTimerUpdatedAt = useStore.getState().lastTimerUpdatedAt
      if (t && t.deviceId && t.deviceId !== myDevice) {
        // Skip if the remote snapshot is stale relative to local state.
        if (localTimerUpdatedAt && t.updatedAt <= localTimerUpdatedAt) { /* skip */ } else {
          patch.mode = t.mode
          patch.timeLeft = t.timeLeft
          patch.endAt = t.endAt
          patch.isRunning = t.isRunning
          patch.sessionInProgress = t.sessionInProgress
          patch.sessionStartedAt = t.sessionStartedAt
          patch.activeTaskId = t.activeTaskId
          patch.sessionCount = t.sessionCount
          patch.lastTimerUpdatedAt = t.updatedAt
        }
      }
    }

    // Derive totalSessions and streak from dailyHistory (source of truth).
    const dailyHistory = patch.dailyHistory ?? state.dailyHistory
    patch.totalSessions = computeTotalSessions(dailyHistory)
    patch.streak = computeStreak(dailyHistory, 0)

    useStore.setState(patch)
  } catch (e) {
    console.warn('[sync] pullSecondary failed', e)
  }
}

async function flushQueue(): Promise<void> {
  if (!activeUserId || !enabled) return
  if (!isOnline()) {
    setState({ status: 'offline' })
    return
  }
  if (flushing) return
  flushing = true
  setState({ status: 'syncing' })

  try {
    const userId = activeUserId
    let ops = readQueue(userId)
    while (ops.length > 0 && activeUserId === userId) {
      const op = ops[0]
      // Skip ops that have failed too many times — they need manual attention.
      if (op.retries >= 5) {
        ops = ops.slice(1)
        // Move to the back so the rest of the queue still drains.
        const dead: SyncOp = { ...op }
        writeQueue(userId, [...ops, dead])
        ops = readQueue(userId)
        continue
      }
      try {
        await pushOp(userId, op)
        removeOp(userId, op.id)
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        markOpError(userId, op.id, msg)
        // Stop the loop on the first failure so we don't hammer the API.
        // The next online/visibility event (or next mutation) will retry.
        setState({ status: 'error' })
        break
      }
      ops = readQueue(userId)
    }
    refreshPending()
    if (current.status !== 'error') {
      setState({
        status: isOnline() ? 'synced' : 'offline',
        lastSyncedAt: Date.now(),
      })
    }
  } finally {
    flushing = false
  }
}
