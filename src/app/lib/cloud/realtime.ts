// ─────────────────────────────────────────────────────────────────────────────
// Cross-Device Realtime — Supabase postgres_changes subscriptions.
//
// A single manager owns all channels for the signed-in user. Each channel is
// filtered by user_id so only that account's rows are broadcast.
//
// Echo suppression: whenever the local device pushes a mutation via the sync
// queue, `markLocalEcho(entity, entityId)` is called; realtime events whose
// updated_at/created_at is within the recent window and matches an echoed id
// are ignored to prevent the local optimistic state from being overwritten
// with the server-round-tripped copy (which would flicker the UI).
// ─────────────────────────────────────────────────────────────────────────────

import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useRootStore as useStore } from '@/app/stores/rootStore'
import type { Task } from '@/app/domain/tasks/task.types'
import type { NotificationItem, NotificationType } from '@/app/domain/notifications/notification.types'
import type { DailyStats, SessionHistoryItem } from '@/app/domain/stats/stats.types'
import { pullSettings } from './settingsSync'
import { rowToTask } from './tasksSync'

const channels: RealtimeChannel[] = []
const echoes = new Map<string, number>()
const ECHO_TTL = 4000

function echoKey(entity: string, entityId: string): string {
  return `${entity}:${entityId}`
}

export function markLocalEcho(entity: string, entityId: string): void {
  echoes.set(echoKey(entity, entityId), Date.now())
}

function isRecentEcho(entity: string, entityId: string): boolean {
  const t = echoes.get(echoKey(entity, entityId))
  if (!t) return false
  if (Date.now() - t > ECHO_TTL) {
    echoes.delete(echoKey(entity, entityId))
    return false
  }
  return true
}

// ── Row-shape helpers ───────────────────────────────────────────────────────

interface DbTaskRow {
  id: string
  user_id: string
  title: string
  description: string | null
  notes: string | null
  status: 'pending' | 'in_progress' | 'completed' | 'archived'
  priority: Task['priority']
  estimated_pomodoros: number | null
  completed_pomodoros: number | null
  completed_at: string | null
  position: number | null
  created_at: string
  updated_at: string
}

function applyTaskEvent(payload: RealtimePostgresChangesPayload<DbTaskRow>) {
  const { eventType, new: newRow, old: oldRow } = payload
  const id = (newRow as DbTaskRow)?.id ?? (oldRow as DbTaskRow)?.id
  if (!id) return
  if (isRecentEcho('task', id)) return

  const state = useStore.getState()
  if (eventType === 'DELETE') {
    if (!state.tasks.some((t) => t.id === id)) return
    useStore.setState({
      tasks: state.tasks.filter((t) => t.id !== id),
      activeTaskId: state.activeTaskId === id ? null : state.activeTaskId,
    })
    return
  }
  const incoming = rowToTask(newRow as DbTaskRow)
  const idx = state.tasks.findIndex((t) => t.id === id)
  const next = [...state.tasks]
  if (idx >= 0) {
    const local = state.tasks[idx] as Task & { updatedAt?: string }
    const localUpdated = local.updatedAt ?? local.createdAt
    // LWW: only apply if the server row is same-or-newer than local.
    if (incoming.updatedAt < localUpdated) return
    next[idx] = incoming
  } else {
    next.push(incoming)
  }
  // Keep the array roughly ordered by server position so reorders on device A
  // land in the same order on device B.
  next.sort((a, b) => {
    const pa = (a as Task & { _position?: number })._position ?? 0
    const pb = (b as Task & { _position?: number })._position ?? 0
    return pa - pb
  })
  useStore.setState({ tasks: next })
}

// ── Notifications ───────────────────────────────────────────────────────────

interface DbNotifRow {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  is_read: boolean
  created_at: string
  data: { local_type?: string } | null
}

function rowToNotif(row: DbNotifRow): NotificationItem {
  const local = row.data?.local_type as NotificationType | undefined
  return {
    id: row.id,
    type: local ?? (row.type === 'success' ? 'task_complete' : 'session_complete'),
    title: row.title,
    message: row.message,
    read: !!row.is_read,
    timestamp: row.created_at,
  }
}

function applyNotifEvent(payload: RealtimePostgresChangesPayload<DbNotifRow>) {
  const { eventType, new: newRow, old: oldRow } = payload
  const id = (newRow as DbNotifRow)?.id ?? (oldRow as DbNotifRow)?.id
  if (!id) return
  if (isRecentEcho('notification', id)) return

  const state = useStore.getState()
  if (eventType === 'DELETE') {
    useStore.setState({ notifications: state.notifications.filter((n) => n.id !== id) })
    return
  }
  const incoming = rowToNotif(newRow as DbNotifRow)
  const idx = state.notifications.findIndex((n) => n.id === id)
  const next = [...state.notifications]
  if (idx >= 0) next[idx] = incoming
  else next.unshift(incoming)
  useStore.setState({ notifications: next.slice(0, 50) })
}

// ── User settings (includes timer snapshot + name/goals/sounds) ─────────────

async function applySettingsEvent(userId: string) {
  if (isRecentEcho('setting', 'self')) return
  try {
    const pulled = await pullSettings(userId)
    if (!pulled) return
    const patch: Record<string, unknown> = { settings: pulled.settings }
    if (pulled.dailyGoal !== undefined) patch.dailyGoal = pulled.dailyGoal
    if (pulled.weeklyGoal !== undefined) patch.weeklyGoal = pulled.weeklyGoal
    if (pulled.monthlyGoal !== undefined) patch.monthlyGoal = pulled.monthlyGoal
    if (pulled.soundVolume !== undefined) patch.soundVolume = pulled.soundVolume
    if (pulled.activeSounds !== undefined) patch.activeSounds = pulled.activeSounds
    if (pulled.userName !== undefined) patch.userName = pulled.userName

    // Mirror the remote timer snapshot when it originated from a different
    // device. When the local device is the owner, skip so we don't flap our
    // own state.
    const t = pulled.activeTimer
    const myDevice = getDeviceId()
    if (t && t.deviceId && t.deviceId !== myDevice) {
      patch.mode = t.mode
      patch.timeLeft = t.timeLeft
      patch.isRunning = t.isRunning
      patch.sessionInProgress = t.sessionInProgress
      patch.sessionStartedAt = t.sessionStartedAt
      patch.activeTaskId = t.activeTaskId
      patch.sessionCount = t.sessionCount ?? useStore.getState().sessionCount
    }
    useStore.setState(patch as never)
  } catch (e) {
    console.warn('[realtime] settings apply failed', e)
  }
}

// ── Statistics: pull latest daily rows on any change ────────────────────────

interface DbDailyRow {
  user_id: string
  date: string
  focus_minutes: number
  completed_sessions: number
  completed_tasks: number
}

async function refreshDailyStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from('daily_statistics')
      .select('date, focus_minutes, completed_sessions, completed_tasks')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(60)
    if (error) throw error
    const rows = (data ?? []) as DbDailyRow[]
    const dailyHistory: DailyStats[] = rows.map((r) => ({
      date: r.date,
      sessions: r.completed_sessions,
      focusMinutes: r.focus_minutes,
    }))
    useStore.setState({ dailyHistory })
  } catch (e) {
    console.warn('[realtime] daily stats refresh failed', e)
  }
}

// ── Sessions history mirror ─────────────────────────────────────────────────

interface DbSessionRow {
  id: string
  user_id: string
  task_id: string | null
  session_type: 'focus' | 'short_break' | 'long_break'
  duration_seconds: number
  ended_at: string | null
  completed: boolean
}

async function applySessionEvent(payload: RealtimePostgresChangesPayload<DbSessionRow>, userId: string) {
  if (payload.eventType !== 'INSERT') return
  const row = payload.new as DbSessionRow
  if (!row.completed) return
  if (isRecentEcho('session', row.id)) return
  const state = useStore.getState()
  if (state.sessionHistory.some((s) => s.id === row.id)) return
  const task = state.tasks.find((t) => t.id === row.task_id)
  const item: SessionHistoryItem = {
    id: row.id,
    taskId: row.task_id,
    taskTitle: task?.title ?? null,
    mode: row.session_type === 'focus'
      ? 'pomodoro'
      : row.session_type === 'short_break' ? 'shortBreak' : 'longBreak',
    duration: Math.round(row.duration_seconds / 60),
    completedAt: row.ended_at ?? new Date().toISOString(),
  }
  useStore.setState({ sessionHistory: [item, ...state.sessionHistory].slice(0, 100) })
  // Stats will be refreshed by the daily_statistics trigger fanout.
  void refreshDailyStats(userId)
}

// ── Public lifecycle ────────────────────────────────────────────────────────

export async function startRealtime(userId: string): Promise<void> {
  stopRealtime()
  const filter = `user_id=eq.${userId}`

  const tasksCh = supabase
    .channel(`rt:tasks:${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter }, applyTaskEvent)
    .subscribe()

  const notifCh = supabase
    .channel(`rt:notifications:${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter }, applyNotifEvent)
    .subscribe()

  const settingsCh = supabase
    .channel(`rt:user_settings:${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'user_settings', filter }, () => {
      void applySettingsEvent(userId)
    })
    .subscribe()

  const statsCh = supabase
    .channel(`rt:daily_statistics:${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'daily_statistics', filter }, () => {
      void refreshDailyStats(userId)
    })
    .subscribe()

  const sessionsCh = supabase
    .channel(`rt:pomodoro_sessions:${userId}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pomodoro_sessions', filter }, (p) => {
      void applySessionEvent(p as RealtimePostgresChangesPayload<DbSessionRow>, userId)
    })
    .subscribe()

  channels.push(tasksCh, notifCh, settingsCh, statsCh, sessionsCh)

  // Initial stats hydration so device B sees today's numbers on load.
  void refreshDailyStats(userId)
}

export function stopRealtime(): void {
  while (channels.length > 0) {
    const ch = channels.pop()
    if (ch) void supabase.removeChannel(ch)
  }
  echoes.clear()
}

// ── Device id (per browser install) ─────────────────────────────────────────

const DEVICE_KEY = 'focusflow:deviceId'

export function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server'
  let id = window.localStorage.getItem(DEVICE_KEY)
  if (!id) {
    id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `dev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(DEVICE_KEY, id)
  }
  return id
}
