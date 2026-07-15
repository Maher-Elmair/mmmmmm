// ─────────────────────────────────────────────────────────────────────────────
// Pomodoro sessions & cycles → Supabase (append-only push).
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '@/integrations/supabase/client'
import type { TimerMode } from '@/app/domain/pomodoro/timer.types'
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
