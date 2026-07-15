// ─────────────────────────────────────────────────────────────────────────────
// User settings ↔ Supabase (upsert on change, pull on start).
// Fields not covered by the DB schema (sound flags, dailyGoal, activeSounds)
// live in the `extra` jsonb column so nothing is lost.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '@/integrations/supabase/client'
import type { Settings } from '@/app/domain/pomodoro/timer.types'
import { DEFAULT_SETTINGS } from '@/app/domain/pomodoro/timer.types'
import type { SyncOp } from './syncQueue'

export interface ActiveTimerSnapshot {
  deviceId: string
  mode: 'pomodoro' | 'shortBreak' | 'longBreak'
  timeLeft: number
  endAt: number | null
  isRunning: boolean
  sessionInProgress: boolean
  sessionStartedAt: string | null
  activeTaskId: string | null
  sessionCount: number
  updatedAt: string
}

export interface SettingsPayload {
  settings: Settings
  dailyGoal?: number
  weeklyGoal?: number
  monthlyGoal?: number
  soundVolume?: number
  activeSounds?: string[]
  userName?: string
  activeTimer?: ActiveTimerSnapshot | null
}

export async function pushSettingsOp(userId: string, op: SyncOp): Promise<void> {
  if (op.type !== 'create' && op.type !== 'update') return
  const p = op.payload as SettingsPayload
  const s = p.settings

  // Merge into existing `extra` so a partial push (e.g. only activeTimer)
  // doesn't wipe unrelated fields like userName/goals.
  const { data: existing } = await supabase
    .from('user_settings')
    .select('extra')
    .eq('user_id', userId)
    .maybeSingle()
  const currentExtra = (existing?.extra ?? {}) as Record<string, unknown>

  const nextExtra: Record<string, unknown> = {
    ...currentExtra,
    uiSoundsEnabled: s.uiSoundsEnabled,
    hoverSoundsEnabled: s.hoverSoundsEnabled,
    requireTaskForSession: s.requireTaskForSession,
    dailyGoal: p.dailyGoal ?? s.dailyGoal,
  }
  if (p.weeklyGoal !== undefined) nextExtra.weeklyGoal = p.weeklyGoal
  if (p.monthlyGoal !== undefined) nextExtra.monthlyGoal = p.monthlyGoal
  if (p.soundVolume !== undefined) nextExtra.soundVolume = p.soundVolume
  if (p.activeSounds !== undefined) nextExtra.activeSounds = p.activeSounds
  if (p.userName !== undefined) nextExtra.userName = p.userName
  if (p.activeTimer !== undefined) nextExtra.activeTimer = p.activeTimer

  const row = {
    user_id: userId,
    theme: s.theme,
    notifications_enabled: s.notificationsEnabled,
    sound_enabled: s.soundEnabled,
    pomodoro_duration_minutes: s.pomodoroDuration,
    short_break_duration_minutes: s.shortBreakDuration,
    long_break_duration_minutes: s.longBreakDuration,
    auto_start_breaks: s.autoStartBreaks,
    auto_start_pomodoros: s.autoStartSessions,
    extra: nextExtra as unknown as never,
  }
  const { error } = await supabase
    .from('user_settings')
    .upsert(row, { onConflict: 'user_id' })
  if (error) throw error
}

export interface PulledSettings {
  settings: Settings
  dailyGoal?: number
  weeklyGoal?: number
  monthlyGoal?: number
  soundVolume?: number
  activeSounds?: string[]
  userName?: string
  activeTimer?: ActiveTimerSnapshot | null
}

export async function pullSettings(userId: string): Promise<PulledSettings | null> {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  const extra = (data.extra ?? {}) as Record<string, unknown>
  const settings: Settings = {
    ...DEFAULT_SETTINGS,
    pomodoroDuration: data.pomodoro_duration_minutes ?? DEFAULT_SETTINGS.pomodoroDuration,
    shortBreakDuration: data.short_break_duration_minutes ?? DEFAULT_SETTINGS.shortBreakDuration,
    longBreakDuration: data.long_break_duration_minutes ?? DEFAULT_SETTINGS.longBreakDuration,
    autoStartBreaks: !!data.auto_start_breaks,
    autoStartSessions: !!data.auto_start_pomodoros,
    notificationsEnabled: data.notifications_enabled ?? true,
    soundEnabled: data.sound_enabled ?? true,
    uiSoundsEnabled: (extra.uiSoundsEnabled as boolean) ?? DEFAULT_SETTINGS.uiSoundsEnabled,
    hoverSoundsEnabled: (extra.hoverSoundsEnabled as boolean) ?? DEFAULT_SETTINGS.hoverSoundsEnabled,
    requireTaskForSession:
      (extra.requireTaskForSession as boolean) ?? DEFAULT_SETTINGS.requireTaskForSession,
    theme: (data.theme as Settings['theme']) ?? DEFAULT_SETTINGS.theme,
    dailyGoal: (extra.dailyGoal as number) ?? DEFAULT_SETTINGS.dailyGoal,
  }
  return {
    settings,
    dailyGoal: extra.dailyGoal as number | undefined,
    weeklyGoal: extra.weeklyGoal as number | undefined,
    monthlyGoal: extra.monthlyGoal as number | undefined,
    soundVolume: extra.soundVolume as number | undefined,
    activeSounds: extra.activeSounds as string[] | undefined,
    userName: extra.userName as string | undefined,
    activeTimer: (extra.activeTimer as ActiveTimerSnapshot | undefined) ?? null,
  }
}

export async function pushProfileOp(userId: string, op: SyncOp): Promise<void> {
  if (op.type !== 'update') return
  const p = op.payload as { display_name?: string; avatar_url?: string | null }
  const { error } = await supabase.from('profiles').update(p).eq('id', userId)
  if (error) throw error
}
