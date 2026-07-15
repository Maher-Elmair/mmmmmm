import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_SETTINGS } from '../domain/pomodoro/timer.types'
import { computeStreak, computeTotalSessions } from '../domain/stats/stats.rules'
import { createSettingsSlice, type SettingsSlice } from './slices/settingsSlice'
import { createTasksSlice, type TasksSlice } from './slices/tasksSlice'
import { createStatsSlice, type StatsSlice } from './slices/statsSlice'
import { createNotificationsSlice, type NotificationsSlice } from './slices/notificationsSlice'
import { createUISlice, type UISlice } from './slices/uiSlice'
import { createTimerSlice, type TimerSlice } from './slices/timerSlice'

export type RootState = TimerSlice &
  TasksSlice &
  SettingsSlice &
  StatsSlice &
  NotificationsSlice &
  UISlice

export const useRootStore = create<RootState>()(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createTasksSlice(...a),
      ...createStatsSlice(...a),
      ...createNotificationsSlice(...a),
      ...createUISlice(...a),
      ...createTimerSlice(...a),
    }),
    {
      name: 'focusflow-storage',
      version: 5,
      migrate: (persisted: unknown) => {
        const p = (persisted ?? {}) as Partial<RootState>
        return {
          ...p,
          settings: { ...DEFAULT_SETTINGS, ...(p.settings ?? {}) },
          sessionInProgress: false,
          isRunning: false,
          endAt: null,
          todaySessions: p.todaySessions ?? 0,
          lastSessionDate: p.lastSessionDate ?? null,
          lastTimerUpdatedAt: p.lastTimerUpdatedAt ?? null,
        } as RootState
      },
      partialize: (state) => ({
        tasks: state.tasks,
        settings: state.settings,
        totalSessions: state.totalSessions,
        sessionCount: state.sessionCount,
        todaySessions: state.todaySessions,
        lastSessionDate: state.lastSessionDate,
        sessionInProgress: state.sessionInProgress,
        mode: state.mode,
        timeLeft: state.timeLeft,
        endAt: state.endAt,
        activeTaskId: state.activeTaskId,
        dailyHistory: state.dailyHistory,
        sessionHistory: state.sessionHistory,
        notifications: state.notifications,
        streak: state.streak,
        dailyGoal: state.dailyGoal,
        weeklyGoal: state.weeklyGoal,
        monthlyGoal: state.monthlyGoal,
        soundVolume: state.soundVolume,
        activeSounds: state.activeSounds,
        userName: state.userName,
        sessionStartedAt: state.sessionStartedAt,
        currentCycleId: state.currentCycleId,
        lastTimerUpdatedAt: state.lastTimerUpdatedAt,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<RootState>
        const settings = { ...DEFAULT_SETTINGS, ...current.settings, ...(p.settings ?? {}) }

        // Recompute todaySessions from sessionHistory if the date has changed.
        const today = new Date().toISOString().split('T')[0]
        const todaySessions = p.lastSessionDate === today
          ? (p.todaySessions ?? 0)
          : (p.sessionHistory ?? []).filter((s: { completedAt?: string }) => s.completedAt?.startsWith(today)).length

        // Derive streak and totalSessions from dailyHistory (source of truth from Supabase).
        const dailyHistory = p.dailyHistory ?? current.dailyHistory
        const streak = computeStreak(dailyHistory, 0)
        const totalSessions = computeTotalSessions(dailyHistory)

        // Reconstruct timeLeft from endAt when the timer was running.
        const isRunning = !!p.isRunning && !!p.endAt && p.endAt > Date.now()
        const timeLeft = isRunning
          ? Math.max(0, Math.round(((p.endAt as number) - Date.now()) / 1000))
          : (p.timeLeft ?? current.timeLeft)

        return {
          ...current,
          ...p,
          settings,
          dailyGoal: settings.dailyGoal,
          lastTimerUpdatedAt: p.lastTimerUpdatedAt ?? current.lastTimerUpdatedAt,
          todaySessions,
          lastSessionDate: p.lastSessionDate ?? current.lastSessionDate,
          streak,
          totalSessions,
          isRunning,
          timeLeft,
          endAt: isRunning ? (p.endAt ?? null) : null,
        }
      },
    },
  ),
)
