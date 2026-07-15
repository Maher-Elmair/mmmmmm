// ─────────────────────────────────────────────────────────────────────────────
// Tasks ↔ Supabase mapping + pull/push helpers.
// Conflict resolution: Last-Write-Wins on `updated_at` (server) vs
// `updatedAt` (local snapshot at op-enqueue time).
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'
import type { Task, TaskPriority, TaskStatus } from '@/app/domain/tasks/task.types'
import type { SyncOp } from './syncQueue'

type TaskUpdate = Database['public']['Tables']['tasks']['Update']


const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(id: string): boolean {
  return UUID_RE.test(id)
}

export function newUuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  // RFC4122-ish fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// DB enum is { pending, in_progress, completed, archived }; local store uses
// `active` for the in-progress state. Map both directions.
type DbTaskStatus = 'pending' | 'in_progress' | 'completed' | 'archived'

function toDbStatus(s: TaskStatus): DbTaskStatus {
  return s === 'active' ? 'in_progress' : s
}
function fromDbStatus(s: DbTaskStatus): TaskStatus {
  return s === 'in_progress' ? 'active' : s
}

export interface DbTaskRow {
  id: string
  user_id: string
  title: string
  description: string | null
  notes: string | null
  status: DbTaskStatus
  priority: TaskPriority
  estimated_pomodoros: number | null
  completed_pomodoros: number | null
  completed_at: string | null
  position: number | null
  created_at: string
  updated_at: string
}

export function rowToTask(row: DbTaskRow): Task & { updatedAt: string; _position: number } {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    notes: row.notes ?? undefined,
    priority: row.priority,
    status: fromDbStatus(row.status),
    estimatedPomodoros: row.estimated_pomodoros ?? 1,
    completedPomodoros: row.completed_pomodoros ?? 0,
    createdAt: row.created_at,
    completedAt: row.completed_at ?? undefined,
    updatedAt: row.updated_at,
    _position: row.position ?? 0,
  }
}

export function taskToInsert(
  task: Task & { updatedAt?: string },
  userId: string,
  position: number,
) {
  return {
    id: task.id,
    user_id: userId,
    title: task.title,
    description: task.description ?? null,
    notes: task.notes ?? null,
    status: toDbStatus(task.status),
    priority: task.priority,
    estimated_pomodoros: task.estimatedPomodoros,
    completed_pomodoros: task.completedPomodoros,
    completed_at: task.completedAt ?? null,
    position,
    created_at: task.createdAt,
    updated_at: task.updatedAt ?? new Date().toISOString(),
  }
}


export function taskToUpdate(
  payload: Partial<Task> & { updatedAt?: string; position?: number },
): TaskUpdate {
  const out: TaskUpdate = {}
  if (payload.title !== undefined) out.title = payload.title
  if (payload.description !== undefined) out.description = payload.description ?? null
  if (payload.notes !== undefined) out.notes = payload.notes ?? null
  if (payload.status !== undefined) out.status = toDbStatus(payload.status)
  if (payload.priority !== undefined) out.priority = payload.priority
  if (payload.estimatedPomodoros !== undefined)
    out.estimated_pomodoros = payload.estimatedPomodoros
  if (payload.completedPomodoros !== undefined)
    out.completed_pomodoros = payload.completedPomodoros
  if (payload.completedAt !== undefined)
    out.completed_at = payload.completedAt ?? null
  if (payload.position !== undefined) out.position = payload.position
  out.updated_at = payload.updatedAt ?? new Date().toISOString()
  return out
}


// ── Pull (server → local) ────────────────────────────────────────────────────

export async function pullTasks(
  userId: string,
): Promise<(Task & { updatedAt: string })[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('position', { ascending: true })
  if (error) throw error
  return (data ?? []).map((row) => rowToTask(row as DbTaskRow))
}

// ── Push (apply a single queued op) ──────────────────────────────────────────

export async function pushTaskOp(
  userId: string,
  op: SyncOp,
): Promise<void> {
  if (op.entity !== 'task') return

  if (op.type === 'delete') {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', op.entityId)
      .eq('user_id', userId)
    if (error) throw error
    return
  }

  if (op.type === 'create') {
    const payload = op.payload as Task & { updatedAt?: string; position?: number }
    const row = taskToInsert(payload, userId, payload.position ?? 0)
    // upsert so a retried create doesn't fail with unique-violation
    const { error } = await supabase.from('tasks').upsert(row, {
      onConflict: 'id',
    })
    if (error) throw error
    return
  }

  // update — apply LWW: only overwrite if our clientUpdatedAt >= server updated_at
  const updates = taskToUpdate(
    (op.payload ?? {}) as Partial<Task> & { updatedAt?: string },
  )
  updates.updated_at = op.clientUpdatedAt

  const { data: existing, error: readErr } = await supabase
    .from('tasks')
    .select('updated_at')
    .eq('id', op.entityId)
    .eq('user_id', userId)
    .maybeSingle()
  if (readErr) throw readErr

  if (existing && existing.updated_at > op.clientUpdatedAt) {
    // Server is newer — drop this op silently (LWW).
    return
  }

  const { error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', op.entityId)
    .eq('user_id', userId)
  if (error) throw error
}
