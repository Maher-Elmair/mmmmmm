import type { StateCreator } from 'zustand'
import type {
  NotificationItem,
  NotificationType,
} from '../../domain/notifications/notification.types'
import { makeNotification, pushNotification } from '../../domain/notifications/notification.factory'
import type { RootState } from '../rootStore'
import { enqueueOp } from '../../lib/cloud/sync'

export interface NotificationsSlice {
  notifications: NotificationItem[]
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void
  markAllNotificationsRead: () => void
}

export const createNotificationsSlice: StateCreator<RootState, [], [], NotificationsSlice> = (
  set,
  get,
) => ({
  notifications: [],
  addNotification: (item) => {
    const notif = makeNotification(item.type as NotificationType, item.title, item.message)
    set((state) => ({ notifications: pushNotification(state.notifications, notif) }))
    enqueueOp('notification', 'create', notif.id, notif)
  },
  markAllNotificationsRead: () => {
    const unreadIds = get().notifications.filter((n) => !n.read).map((n) => n.id)
    set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, read: true })) }))
    unreadIds.forEach((id) => enqueueOp('notification', 'update', id, { read: true }))
  },
})
