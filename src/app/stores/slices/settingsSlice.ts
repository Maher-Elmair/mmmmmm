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

/** Builds the common settings sync payload from store state. */
export function buildSettingsPayload(state: RootState) {
  return {
    settings: state.settings,
    dailyGoal: state.dailyGoal,
    weeklyGoal: state.weeklyGoal,
    monthlyGoal: state.monthlyGoal,
    soundVolume: state.soundVolume,
    activeSounds: state.activeSounds,
    userName: state.userName,
  }
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
    enqueueOp('setting', 'update', 'self', buildSettingsPayload(get()))
  },
})
