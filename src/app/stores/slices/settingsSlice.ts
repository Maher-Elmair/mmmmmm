import type { StateCreator } from 'zustand'
import type { Settings } from '../../domain/pomodoro/timer.types'
import { DEFAULT_SETTINGS } from '../../domain/pomodoro/timer.types'
import { durationsFor } from '../../domain/pomodoro/timer.rules'
import type { RootState } from '../rootStore'
import { enqueueOp } from '../../lib/cloud/sync'

export interface SettingsSlice {
  settings: Settings
  updateSettings: (partial: Partial<Settings>) => void
}

export const createSettingsSlice: StateCreator<RootState, [], [], SettingsSlice> = (set, get) => ({
  settings: DEFAULT_SETTINGS,
  updateSettings: (partial) => {
    const state = get()
    const updated: Settings = { ...state.settings, ...partial }
    const patch: Partial<RootState> = { settings: updated }
    if (partial.dailyGoal !== undefined) patch.dailyGoal = partial.dailyGoal
    if (!state.isRunning) {
      patch.timeLeft = durationsFor(updated)[state.mode]
    }
    set(patch as RootState)
    const next = get()
    enqueueOp('setting', 'update', 'self', {
      settings: updated,
      dailyGoal: next.dailyGoal,
      weeklyGoal: next.weeklyGoal,
      monthlyGoal: next.monthlyGoal,
      soundVolume: next.soundVolume,
      activeSounds: next.activeSounds,
      userName: next.userName,
    })
  },
})
