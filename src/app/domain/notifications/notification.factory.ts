import type { NotificationItem, NotificationType } from './notification.types'

function id(): string {
  return `notif-${Date.now()}`
}

export function makeNotification(
  type: NotificationType,
  title: string,
  message: string,
): NotificationItem {
  return { id: id(), type, title, message, timestamp: new Date().toISOString(), read: false }
}

export function sessionCompleteNotif(activeTaskTitle: string | null): NotificationItem {
  return makeNotification(
    'session_complete',
    'Session Complete',
    activeTaskTitle ? `Completed session on "${activeTaskTitle}"` : 'Focus session complete!',
  )
}

export function breakCompleteNotif(): NotificationItem {
  return makeNotification('break_complete', 'Break Over', 'Ready to start your next focus session?')
}

export function pushNotification(
  list: NotificationItem[],
  item: NotificationItem,
  max = 20,
): NotificationItem[] {
  return [item, ...list].slice(0, max)
}
