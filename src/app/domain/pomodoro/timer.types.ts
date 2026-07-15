export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak'

export interface Settings {
  pomodoroDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartSessions: boolean
  notificationsEnabled: boolean
  soundEnabled: boolean
  uiSoundsEnabled: boolean
  hoverSoundsEnabled: boolean
  requireTaskForSession: boolean
  theme: 'dark' | 'light' | 'system'
  dailyGoal: number
}

export interface CompletionModal {
  show: boolean
  taskTitle: string | null
  taskId: string | null
  duration: number
  nextMode: TimerMode
  taskCompleted: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartSessions: false,
  notificationsEnabled: true,
  soundEnabled: true,
  uiSoundsEnabled: true,
  hoverSoundsEnabled: false,
  requireTaskForSession: true,
  theme: 'dark',
  dailyGoal: 8,
}
