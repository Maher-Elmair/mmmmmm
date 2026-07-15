import type { StateCreator } from 'zustand'
import type { DailyStats, SessionHistoryItem } from '../../domain/stats/stats.types'
import { computeStreak } from '../../domain/stats/stats.rules'
import type { RootState } from '../rootStore'
import { enqueueOp } from '../../lib/cloud/sync'
import { buildSettingsPayload } from './settingsSlice'

export interface StatsSlice {
  dailyHistory: DailyStats[]
  sessionHistory: SessionHistoryItem[]
  totalSessions: number
  streak: number
  dailyGoal: number
  weeklyGoal: number
  monthlyGoal: number
  updateGoals: (goals: { daily?: number; weekly?: number; monthly?: number }) => void
}

export const createStatsSlice: StateCreator<RootState, [], [], StatsSlice> = (set, get) => ({
  dailyHistory: [],
  sessionHistory: [],
  totalSessions: 0,
  streak: 0,
  dailyGoal: 8,
  weeklyGoal: 40,
  monthlyGoal: 160,
  updateGoals: (goals) => {
    set((state) => ({
      dailyGoal: goals.daily ?? state.dailyGoal,
      weeklyGoal: goals.weekly ?? state.weeklyGoal,
      monthlyGoal: goals.monthly ?? state.monthlyGoal,
      settings:
        goals.daily !== undefined ? { ...state.settings, dailyGoal: goals.daily } : state.settings,
    }))
    enqueueOp('setting', 'update', 'self', buildSettingsPayload(get()))
  },
})

export { computeStreak }
