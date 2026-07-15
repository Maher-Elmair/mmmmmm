// ─────────────────────────────────────────────────────────────────────────────
// Pomodoro sessions & cycles ↔ Supabase (append-only push, pull on sign-in).
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '@/integrations/supabase/client'
import type { TimerMode } from '@/app/domain/pomodoro/timer.types'
import type { SessionHistoryItem } from '@/app/domain/stats/stats.types'
import type { SyncOp } from './syncQueue'

type DbSessionType = 'focus' | 'short_break' | 'long_break'

export function toDbSessionType(mode: TimerMode): DbSessionType {
  if (mode === 'pomodoro') return 'focus'
  if (mode === 'shortBreak') return 'short_break'
  return 'long_break'
}

export interface SessionInsertPayload {
  id: string
  task_id: string | null
  cycle_id: string | null
  session_type: DbSessionType
  duration_seconds: number
  started_at: string
  ended_at: string | null
  completed: boolean
  interrupted: boolean
}

export interface CycleInsertPayload {
  id: string
  cycle_number: number
  completed_sessions: number
  started_at: string
  ended_at: string | null
}

export interface CycleUpdatePayload {
  ended_at?: string | null
  completed_sessions?: number
}

export async function pushSessionOp(userId: string, op: SyncOp): Promise<void> {
  if (op.type !== 'create') return // sessions are append-only
  const p = op.payload as SessionInsertPayload
  const { error } = await supabase.from('pomodoro_sessions').upsert(
    { ...p, user_id: userId },
    { onConflict: 'id' },
  )
  if (error) throw error
}

// ── Pull completed sessions on sign-in ──────────────────────────────────────

const SESSION_TYPE_MAP: Record<string, TimerMode> = {
  focus: 'pomodoro',
  short_break: 'shortBreak',
  long_break: 'longBreak',
}

interface DbSessionRow {
  id: string
  task_id: string | null
  session_type: string
  duration_seconds: number
  ended_at: string | null
}

/** Fetch the most recent completed sessions from Supabase. */
export async function pullSessions(userId: string): Promise<SessionHistoryItem[]> {
  const { data, error } = await supabase
    .from('pomodoro_sessions')
    .select('id, task_id, session_type, duration_seconds, ended_at')
    .eq('user_id', userId)
    .eq('completed', true)
    .order('ended_at', { ascending: false })
    .limit(500)
  if (error) throw error
  return (data ?? []).map((row: DbSessionRow) => ({
    id: row.id,
    taskId: row.task_id,
    taskTitle: null,
    mode: SESSION_TYPE_MAP[row.session_type] ?? 'pomodoro',
    duration: Math.round(row.duration_seconds / 60),
    completedAt: row.ended_at ?? new Date().toISOString(),
  }))
}

export async function pushCycleOp(userId: string, op: SyncOp): Promise<void> {
  if (op.type === 'create') {
    const p = op.payload as CycleInsertPayload
    const { error } = await supabase
      .from('pomodoro_cycles')
      .upsert({ ...p, user_id: userId }, { onConflict: 'id' })
    if (error) throw error
    return
  }
  if (op.type === 'update') {
    const p = op.payload as CycleUpdatePayload
    const { error } = await supabase
      .from('pomodoro_cycles')
      .update(p)
      .eq('id', op.entityId)
      .eq('user_id', userId)
    if (error) throw error
  }
}
