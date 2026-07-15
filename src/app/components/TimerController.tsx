import { useEffect, useRef } from 'react'
import { useStore } from '../stores/useStore'

// Single source of truth for the countdown. Uses a wall-clock anchor instead of
// setInterval increments so the timer stays accurate when the tab is
// backgrounded (browsers throttle setInterval to >=1s there) or when the user
// switches tabs / minimizes the window.
export function TimerController() {
  const isRunning = useStore(s => s.isRunning)
  const completeSession = useStore(s => s.completeSession)
  const setTimeLeft = useStore(s => s.setTimeLeft)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const endAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) {
      endAtRef.current = null
      if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
      return
    }
    // Anchor: capture how much time should remain at wall-clock T0
    const startRemaining = useStore.getState().timeLeft
    endAtRef.current = Date.now() + startRemaining * 1000

    const tick = () => {
      const endAt = endAtRef.current
      if (endAt == null) return
      const remaining = Math.max(0, Math.round((endAt - Date.now()) / 1000))
      if (remaining <= 0) {
        endAtRef.current = null
        if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
        completeSession()
        playCompletionTone(useStore.getState().settings.soundEnabled)
        return
      }
      // Always update store so the UI and tab title stay in sync, even after
      // the browser throttles us in a background tab.
      setTimeLeft(remaining)
    }
    tick() // immediate sync
    tickRef.current = setInterval(tick, 500)

    // Re-sync the moment the tab becomes visible again — setInterval is
    // aggressively throttled in background tabs (sometimes paused entirely),
    // so without this the displayed time would jump backwards momentarily.
    const onVis = () => { if (!document.hidden) tick() }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onVis)

    return () => {
      if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null }
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onVis)
    }
  }, [isRunning])

  // Tab title — independent updater driven from wall-clock anchor, so it stays
  // accurate even when React skips renders in a background tab.
  useEffect(() => {
    const update = () => {
      const s = useStore.getState()
      let remaining = s.timeLeft
      if (s.isRunning && endAtRef.current != null) {
        remaining = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000))
      }
      if (s.isRunning) {
        const m = Math.floor(remaining / 60).toString().padStart(2, '0')
        const sec = (remaining % 60).toString().padStart(2, '0')
        const modeLabel =
          s.mode === 'pomodoro' ? 'Focus' : s.mode === 'shortBreak' ? 'Break' : 'Long Break'
        document.title = `${m}:${sec} · ${modeLabel} — PomodoroFlow`
      } else {
        document.title = 'PomodoroFlow'
      }
    }
    update()
    const id = setInterval(update, 1000)
    const onVis = () => update()
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('focus', onVis)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('focus', onVis)
    }
  }, [])

  return null
}

function playCompletionTone(enabled: boolean) {
  if (!enabled) return
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.8)
    setTimeout(() => ctx.close(), 1000)
  } catch { /* ignore */ }
}
