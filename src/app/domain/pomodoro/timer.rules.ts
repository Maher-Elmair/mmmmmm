import type { Settings, TimerMode } from './timer.types'

export function durationsFor(settings: Settings): Record<TimerMode, number> {
  return {
    pomodoro: settings.pomodoroDuration * 60,
    shortBreak: settings.shortBreakDuration * 60,
    longBreak: settings.longBreakDuration * 60,
  }
}

export function nextBreakMode(nextSessionCount: number): TimerMode {
  return nextSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak'
}

export function minutesFor(mode: TimerMode, settings: Settings): number {
  if (mode === 'pomodoro') return settings.pomodoroDuration
  if (mode === 'shortBreak') return settings.shortBreakDuration
  return settings.longBreakDuration
}
