import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_SETTINGS } from '../domain/pomodoro/timer.types'
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
      version: 3,
      migrate: (persisted: unknown) => {
        const p = (persisted ?? {}) as Partial<RootState>
        return {
          ...p,
          settings: { ...DEFAULT_SETTINGS, ...(p.settings ?? {}) },
          sessionInProgress: false,
          isRunning: false,
        } as RootState
      },
      partialize: (state) => ({
        tasks: state.tasks,
        settings: state.settings,
        totalSessions: state.totalSessions,
        sessionCount: state.sessionCount,
        sessionInProgress: state.sessionInProgress,
        mode: state.mode,
        timeLeft: state.timeLeft,
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
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<RootState>
        const settings = { ...DEFAULT_SETTINGS, ...current.settings, ...(p.settings ?? {}) }
        return {
          ...current,
          ...p,
          settings,
          dailyGoal: settings.dailyGoal,
          isRunning: false,
        }
      },
    },
  ),
)
