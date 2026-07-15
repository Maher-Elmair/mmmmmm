import type { StateCreator } from 'zustand'
import type { TimerMode } from '../../domain/pomodoro/timer.types'
import { durationsFor, minutesFor, nextBreakMode } from '../../domain/pomodoro/timer.rules'
import type { Task } from '../../domain/tasks/task.types'
import { incrementPomodoro, isSelectable, shouldAutoComplete } from '../../domain/tasks/task.rules'
import type { DailyStats, SessionHistoryItem } from '../../domain/stats/stats.types'
import { appendDailyPomodoro, computeStreak, computeTotalSessions, pushHistory } from '../../domain/stats/stats.rules'
import type { NotificationItem } from '../../domain/notifications/notification.types'
import {
  breakCompleteNotif,
  pushNotification,
  sessionCompleteNotif,
} from '../../domain/notifications/notification.factory'
import { playUiSound } from '../../lib/sounds'
import {
  dispatchNoTaskEvent,
  notifySessionEnd,
} from '../../services/browserNotification.service'
import { enqueueTaskOp } from '../../lib/cloud/sync'
import { newUuid } from '../../lib/cloud/tasksSync'
import { enqueueOp } from '../../lib/cloud/sync'
import { toDbSessionType } from '../../lib/cloud/sessionsSync'
import { getDeviceId } from '../../lib/cloud/realtime'
import { useRootStore as useStore } from '../rootStore'
import { buildSettingsPayload } from './settingsSlice'
import type { RootState } from '../rootStore'

// Broadcast the current timer snapshot to user_settings.extra.activeTimer so
// other signed-in devices can mirror it read-only. Called on transitions only
// (start/pause/reset/mode-switch/complete), never on per-second ticks.
function broadcastTimer(state: RootState): void {
  const updatedAt = new Date().toISOString()
  enqueueOp('setting', 'update', 'self', {
    ...buildSettingsPayload(state),
    activeTimer: {
      deviceId: getDeviceId(),
      mode: state.mode,
      timeLeft: state.timeLeft,
      endAt: state.endAt,
      isRunning: state.isRunning,
      sessionInProgress: state.sessionInProgress,
      sessionStartedAt: state.sessionStartedAt,
      activeTaskId: state.activeTaskId,
      sessionCount: state.sessionCount,
      updatedAt,
    },
  })
  useStore.setState({ lastTimerUpdatedAt: updatedAt })
}

// ── completeSession helpers ──────────────────────────────────────────────────
// Each extracts a single responsibility from the original god function.
// Execution order is preserved by calling them in sequence inside completeSession.

function recordSessionHistoryItem(
  history: SessionHistoryItem[],
  taskId: string | null,
  taskTitle: string | null,
  mode: TimerMode,
  durationMinutes: number,
  nowIso: string,
): SessionHistoryItem[] {
  const item: SessionHistoryItem = {
    id: `hist-${Date.now()}`,
    taskId,
    taskTitle,
    mode,
    duration: durationMinutes,
    completedAt: nowIso,
  }
  return pushHistory(history, item)
}

function syncTaskCompletionToCloud(
  tasks: Task[],
  activeTaskId: string | null,
  nowIso: string,
): Task[] {
  if (!activeTaskId) return tasks
  const updatedTasks = tasks.map((t) =>
    t.id === activeTaskId ? incrementPomodoro(t, nowIso) : t,
  )
  const updated = updatedTasks.find((x) => x.id === activeTaskId)
  if (updated) {
    enqueueTaskOp('update', activeTaskId, {
      completedPomodoros: updated.completedPomodoros,
      updatedAt: nowIso,
    })
  }
  return updatedTasks
}

function handleCycleBookkeeping(
  currentCycleId: string | null,
  newSessionCount: number,
  startedAt: string,
  nowIso: string,
): { cycleId: string | null; nextCycleId: string | null } {
  const positionInCycle = ((newSessionCount - 1) % 4) + 1
  let cycleId = currentCycleId

  if (positionInCycle === 1) {
    cycleId = newUuid()
    enqueueOp('cycle', 'create', cycleId, {
      id: cycleId,
      cycle_number: Math.ceil(newSessionCount / 4),
      completed_sessions: 0,
      started_at: startedAt,
      ended_at: null,
    })
  }

  let nextCycleId: string | null = cycleId
  if (positionInCycle === 4 && cycleId) {
    enqueueOp('cycle', 'update', cycleId, {
      ended_at: nowIso,
      completed_sessions: 4,
    })
    nextCycleId = null
  }

  return { cycleId, nextCycleId }
}

function syncSessionRowToCloud(
  taskId: string | null,
  cycleId: string | null,
  mode: TimerMode,
  durationSeconds: number,
  startedAt: string,
  nowIso: string,
): void {
  const sessionId = newUuid()
  enqueueOp('session', 'create', sessionId, {
    id: sessionId,
    task_id: taskId,
    cycle_id: cycleId,
    session_type: toDbSessionType(mode),
    duration_seconds: durationSeconds,
    started_at: startedAt,
    ended_at: nowIso,
    completed: true,
    interrupted: false,
  })
}

function updateLocalStats(
  dailyHistory: DailyStats[],
  pomodoroDuration: number,
): { dailyHistory: DailyStats[]; streak: number } {
  const newHistory = appendDailyPomodoro(dailyHistory, pomodoroDuration)
  const streak = computeStreak(newHistory, 0)
  return { dailyHistory: newHistory, streak }
}

function createAndSyncNotification(notif: NotificationItem): NotificationItem {
  enqueueOp('notification', 'create', notif.id, notif)
  return notif
}

function todayKey(): string {
  return new Date().toISOString().split('T')[0]
}

export interface TimerSlice {
  mode: TimerMode
  timeLeft: number
  isRunning: boolean
  sessionCount: number
  todaySessions: number
  lastSessionDate: string | null
  sessionInProgress: boolean
  sessionStartedAt: string | null
  currentCycleId: string | null
  lastTimerUpdatedAt: string | null
  endAt: number | null
  setMode: (mode: TimerMode) => void
  setTimeLeft: (time: number) => void
  setIsRunning: (running: boolean) => void
  requestStart: () => void
  completeSession: () => void
  resetTimer: () => void
}

export const createTimerSlice: StateCreator<RootState, [], [], TimerSlice> = (set, get) => ({
  mode: 'pomodoro',
  timeLeft: 25 * 60,
  isRunning: false,
  sessionCount: 0,
  todaySessions: 0,
  lastSessionDate: null,
  sessionInProgress: false,
  sessionStartedAt: null,
  currentCycleId: null,
  lastTimerUpdatedAt: null,
  endAt: null,

  setMode: (mode) => {
    const state = get()
    const durations = durationsFor(state.settings)
    set({
      mode,
      timeLeft: durations[mode],
      isRunning: false,
      sessionInProgress: false,
      sessionStartedAt: null,
      endAt: null,
    })
    if (state.mode !== mode) playUiSound('modeSwitch')
    broadcastTimer(get())
  },

  setTimeLeft: (timeLeft) => set({ timeLeft }),

  setIsRunning: (isRunning) => {
    const prev = get().isRunning
    set({ isRunning, endAt: isRunning ? get().endAt : null })
    if (isRunning && !prev) playUiSound('start')
    else if (!isRunning && prev) playUiSound('pause')
    if (prev !== isRunning) broadcastTimer(get())
  },

  requestStart: () => {
    const state = get()
    if (state.isRunning) {
      state.setIsRunning(false)
      return
    }
    if (state.mode === 'pomodoro' && state.settings.requireTaskForSession && !state.sessionInProgress) {
      const active = state.tasks.find((t) => t.id === state.activeTaskId)
      if (!isSelectable(active)) {
        dispatchNoTaskEvent()
        set({ noTaskWarning: true })
        return
      }
    }
    const now = Date.now()
    const endAt = now + state.timeLeft * 1000
    const patch: Partial<RootState> = { sessionInProgress: true, endAt }
    if (!state.sessionStartedAt) patch.sessionStartedAt = new Date().toISOString()
    set(patch as RootState)
    state.setIsRunning(true)
    // setIsRunning already broadcasts on the transition — no extra push needed.
  },

  resetTimer: () => {
    const state = get()
    const durations = durationsFor(state.settings)
    set({
      timeLeft: durations[state.mode],
      isRunning: false,
      sessionInProgress: false,
      sessionStartedAt: null,
      endAt: null,
    })
    playUiSound('reset')
    broadcastTimer(get())
  },

  completeSession: () => {
    const state = get()
    const { mode, activeTaskId, tasks, settings } = state

    // 1. Audio feedback
    playUiSound(mode === 'pomodoro' ? 'sessionComplete' : 'notify')
    notifySessionEnd(mode, settings.notificationsEnabled)

    const activeTask = tasks.find((t) => t.id === activeTaskId)
    const nowIso = new Date().toISOString()
    const startedAt = state.sessionStartedAt ?? nowIso
    const durationSeconds = Math.max(1, minutesFor(mode, settings) * 60)

    // 2. Session history item
    const newSessionHistory = recordSessionHistoryItem(
      state.sessionHistory, activeTaskId, activeTask?.title ?? null, mode,
      minutesFor(mode, settings), nowIso,
    )

    if (mode === 'pomodoro') {
      const newCount = state.sessionCount + 1
      const today = todayKey()
      const newTodaySessions = state.lastSessionDate === today
        ? state.todaySessions + 1
        : 1

      // 3. Update task's completed pomodoro count locally + sync to cloud
      const updatedTasks = syncTaskCompletionToCloud(
        tasks, activeTaskId, nowIso,
      )

      // 4. Cycle bookkeeping (every 4 focus sessions)
      const { cycleId, nextCycleId } = handleCycleBookkeeping(
        state.currentCycleId, newCount, startedAt, nowIso,
      )

      // 5. Record session row to Supabase
      syncSessionRowToCloud(activeTaskId, cycleId, mode, durationSeconds, startedAt, nowIso)

      // 6. Update local stats
      const { dailyHistory, streak } = updateLocalStats(
        state.dailyHistory, settings.pomodoroDuration,
      )

      // 7. Create and sync notification
      const notif = createAndSyncNotification(sessionCompleteNotif(activeTask?.title ?? null))

      // 8. Determine next mode and time
      const nextMode = nextBreakMode(newCount)
      const nextTime =
        nextMode === 'longBreak' ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60
      const nextCompleted = activeTask ? activeTask.completedPomodoros + 1 : 0

      // 9. Apply all state updates
      const newTotalSessions = state.totalSessions + 1
      set({
        sessionCount: newCount,
        todaySessions: newTodaySessions,
        lastSessionDate: today,
        totalSessions: newTotalSessions,
        tasks: updatedTasks,
        dailyHistory,
        sessionHistory: newSessionHistory,
        streak,
        notifications: pushNotification(state.notifications, notif),
        isRunning: false,
        sessionInProgress: false,
        sessionStartedAt: null,
        endAt: null,
        currentCycleId: nextCycleId,
        mode: settings.autoStartBreaks ? nextMode : 'pomodoro',
        timeLeft: settings.autoStartBreaks ? nextTime : settings.pomodoroDuration * 60,
        completionModal: {
          show: true,
          taskTitle: activeTask?.title ?? null,
          taskId: activeTaskId,
          duration: settings.pomodoroDuration,
          nextMode,
          taskCompleted: shouldAutoComplete(activeTask, nextCompleted),
        },
      })
      // Sync totalSessions to Supabase so other devices see the updated count.
      enqueueOp('setting', 'update', 'self', {
        ...buildSettingsPayload({ ...get(), totalSessions: newTotalSessions }),
      })
    } else {
      // Break session: record in Supabase (no cycle binding)
      syncSessionRowToCloud(null, null, mode, durationSeconds, startedAt, nowIso)

      const notif = createAndSyncNotification(breakCompleteNotif())
      const today = todayKey()
      const newTodaySessions = state.lastSessionDate === today
        ? state.todaySessions
        : 0
      set({
        mode: 'pomodoro',
        timeLeft: settings.pomodoroDuration * 60,
        isRunning: settings.autoStartSessions,
        sessionInProgress: settings.autoStartSessions,
        sessionStartedAt: settings.autoStartSessions ? nowIso : null,
        sessionHistory: newSessionHistory,
        todaySessions: newTodaySessions,
        lastSessionDate: today,
        notifications: pushNotification(state.notifications, notif),
        endAt: null,
      })
    }
    broadcastTimer(get())
  },
})
