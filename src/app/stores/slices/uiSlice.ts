import type { StateCreator } from 'zustand'
import type { CompletionModal } from '../../domain/pomodoro/timer.types'
import { playUiSound } from '../../lib/sounds'
import type { RootState } from '../rootStore'

export interface UISlice {
  activeSounds: string[]
  soundVolume: number
  isFocusMode: boolean
  isSettingsOpen: boolean
  completionModal: CompletionModal | null
  isCommandPaletteOpen: boolean
  isNotificationCenterOpen: boolean
  isAccountPanelOpen: boolean
  noTaskWarning: boolean
  pendingTaskSwitch: string | null
  userName: string
  toggleSound: (sound: string) => void
  setSoundVolume: (volume: number) => void
  setFocusMode: (enabled: boolean) => void
  setSettingsOpen: (open: boolean) => void
  setCompletionModal: (modal: CompletionModal | null) => void
  setCommandPaletteOpen: (open: boolean) => void
  setNotificationCenterOpen: (open: boolean) => void
  setAccountPanelOpen: (open: boolean) => void
  setNoTaskWarning: (open: boolean) => void
  setPendingTaskSwitch: (id: string | null) => void
  setUserName: (name: string) => void
}

export const createUISlice: StateCreator<RootState, [], [], UISlice> = (set, get) => ({
  activeSounds: [],
  soundVolume: 0.5,
  isFocusMode: false,
  isSettingsOpen: false,
  completionModal: null,
  isCommandPaletteOpen: false,
  isNotificationCenterOpen: false,
  isAccountPanelOpen: false,
  noTaskWarning: false,
  pendingTaskSwitch: null,
  userName: 'Jordan Davis',

  toggleSound: (sound) => {
    playUiSound('toggle')
    set((state) => ({
      activeSounds: state.activeSounds.includes(sound) ? [] : [sound],
    }))
  },
  setSoundVolume: (soundVolume) => set({ soundVolume }),
  setFocusMode: (isFocusMode) => {
    const prev = get().isFocusMode
    set({ isFocusMode })
    if (isFocusMode !== prev) playUiSound(isFocusMode ? 'focusOn' : 'focusOff')
  },
  setSettingsOpen: (isSettingsOpen) => {
    set({ isSettingsOpen })
    playUiSound(isSettingsOpen ? 'tabSwitch' : 'click')
  },
  setCompletionModal: (completionModal) => set({ completionModal }),
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
  setNotificationCenterOpen: (isNotificationCenterOpen) => set({ isNotificationCenterOpen }),
  setAccountPanelOpen: (isAccountPanelOpen) => set({ isAccountPanelOpen }),
  setNoTaskWarning: (noTaskWarning) => set({ noTaskWarning }),
  setPendingTaskSwitch: (pendingTaskSwitch) => set({ pendingTaskSwitch }),
  setUserName: (userName) => set({ userName }),
})
