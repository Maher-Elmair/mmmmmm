import type { TimerMode } from '../pomodoro/timer.types'

export interface DailyStats {
  date: string
  sessions: number
  focusMinutes: number
}

export interface SessionHistoryItem {
  id: string
  taskId: string | null
  taskTitle: string | null
  mode: TimerMode
  duration: number
  completedAt: string
}
