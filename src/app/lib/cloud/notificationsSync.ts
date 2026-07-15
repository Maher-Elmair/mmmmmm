// ─────────────────────────────────────────────────────────────────────────────
// Notifications ↔ Supabase.
// Local domain has 4 types (session_complete / break_complete / task_complete /
// goal_achieved) — the DB enum is a generic (info/success/warning/error/reminder).
// We collapse to 'reminder' for pomodoro events and 'success' for goals.
// The original local type is preserved in the JSONB `data` column.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '@/integrations/supabase/client'
import type {
  NotificationItem,
  NotificationType,
} from '@/app/domain/notifications/notification.types'
import type { SyncOp } from './syncQueue'

type DbNotificationType = 'info' | 'success' | 'warning' | 'error' | 'reminder'

function toDbType(t: NotificationType): DbNotificationType {
  if (t === 'goal_achieved' || t === 'task_complete') return 'success'
  return 'reminder'
}

function fromDbType(
  t: DbNotificationType,
  fallback: NotificationType = 'session_complete',
): NotificationType {
  // 'success' maps to task_complete; all other DB types (info, warning, error,
  // reminder) fall back to session_complete — the most common notification type.
  // Rows missing local_type in JSONB data (legacy, manual inserts) get this
  // fallback, which is correct for the vast majority of cases.
  return t === 'success' ? 'task_complete' : fallback
}

export async function pushNotificationOp(
  userId: string,
  op: SyncOp,
): Promise<void> {
  if (op.type === 'create') {
    const n = op.payload as NotificationItem
    const { error } = await supabase.from('notifications').upsert(
      {
        id: n.id,
        user_id: userId,
        type: toDbType(n.type),
        title: n.title,
        message: n.message,
        is_read: n.read,
        read_at: n.read ? new Date().toISOString() : null,
        created_at: n.timestamp,
        data: { local_type: n.type },
      },
      { onConflict: 'id' },
    )
    if (error) throw error
    return
  }
  if (op.type === 'update') {
    const patch = op.payload as { read?: boolean }
    const { error } = await supabase
      .from('notifications')
      .update({
        is_read: patch.read ?? true,
        read_at: patch.read === false ? null : new Date().toISOString(),
      })
      .eq('id', op.entityId)
      .eq('user_id', userId)
    if (error) throw error
  }
}

export async function pullNotifications(userId: string): Promise<NotificationItem[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, type, title, message, is_read, created_at, data')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) throw error
  return (data ?? []).map((row) => {
    const localFromData =
      row.data && typeof row.data === 'object' && 'local_type' in row.data
        ? ((row.data as { local_type?: string }).local_type as NotificationType)
        : undefined
    return {
      id: row.id,
      type: localFromData ?? fromDbType(row.type as DbNotificationType),
      title: row.title,
      message: row.message ?? '',
      timestamp: row.created_at,
      read: row.is_read,
    }
  })
}
