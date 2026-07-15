import type { TimerMode } from '../domain/pomodoro/timer.types'

export function notifySessionEnd(mode: TimerMode, enabled: boolean): void {
  if (!enabled) return
  if (typeof window === 'undefined') return
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  new Notification(mode === 'pomodoro' ? 'Session complete' : 'Break over', {
    body: mode === 'pomodoro' ? 'Time for a break.' : 'Ready to focus again?',
  })
}

export function dispatchNoTaskEvent(): void {
  if (typeof window === 'undefined') return
  try {
    window.dispatchEvent(new CustomEvent('focusflow:no-task'))
  } catch {
    /* noop */
  }
}
