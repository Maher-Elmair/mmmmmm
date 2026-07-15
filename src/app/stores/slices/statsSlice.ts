import type { StateCreator } from 'zustand'
import type { DailyStats, SessionHistoryItem } from '../../domain/stats/stats.types'
import { computeStreak } from '../../domain/stats/stats.rules'
import type { RootState } from '../rootStore'
import { enqueueOp } from '../../lib/cloud/sync'

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
    const s = get()
    enqueueOp('setting', 'update', 'self', {
      settings: s.settings,
      dailyGoal: s.dailyGoal,
      weeklyGoal: s.weeklyGoal,
      monthlyGoal: s.monthlyGoal,
      soundVolume: s.soundVolume,
      activeSounds: s.activeSounds,
      userName: s.userName,
    })
  },
})

export { computeStreak }
