// Back-compat re-export so existing component imports continue to resolve.
// Canonical source: rootStore.ts + domain type files.
export { useRootStore as useStore } from './rootStore'
export type { RootState as StoreState } from './rootStore'
export type { Task, TaskPriority, TaskStatus } from '../domain/tasks/task.types'
export type { TimerMode, Settings, CompletionModal } from '../domain/pomodoro/timer.types'
export type { DailyStats, SessionHistoryItem } from '../domain/stats/stats.types'
export type { NotificationItem } from '../domain/notifications/notification.types'
