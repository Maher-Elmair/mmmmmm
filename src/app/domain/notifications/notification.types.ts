export type NotificationType =
  | 'session_complete'
  | 'break_complete'
  | 'task_complete'
  | 'goal_achieved'

export interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
}
