// Lightweight WebAudio UI sound helper. No external assets.
import { useStore } from '../stores/useStore'

export type SoundName =
  | 'start'
  | 'pause'
  | 'reset'
  | 'taskAdd'
  | 'taskDone'
  | 'taskDelete'
  | 'taskArchive'
  | 'taskRestore'
  | 'modeSwitch'
  | 'tabSwitch'
  | 'focusOn'
  | 'focusOff'
  | 'sessionComplete'
  | 'notify'
  | 'toggle'
  | 'hover'
  | 'click'

let ctx: AudioContext | null = null
function getCtx(): AudioContext | null {
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    return ctx
  } catch { return null }
}

function tone(freq: number, duration = 0.12, type: OscillatorType = 'sine', gainVal = 0.18, delay = 0) {
  const c = getCtx(); if (!c) return
  const t0 = c.currentTime + delay
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gainVal, t0 + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(g); g.connect(c.destination)
  osc.start(t0); osc.stop(t0 + duration + 0.02)
}

function noiseBurst(duration = 0.08, gainVal = 0.08, filterFreq = 2000) {
  const c = getCtx(); if (!c) return
  const t0 = c.currentTime
  const bufferSize = Math.max(1, Math.floor(c.sampleRate * duration))
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  const src = c.createBufferSource(); src.buffer = buffer
  const filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = filterFreq
  const g = c.createGain(); g.gain.setValueAtTime(gainVal, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  src.connect(filter); filter.connect(g); g.connect(c.destination)
  src.start(t0); src.stop(t0 + duration + 0.02)
}

/** Volume tick — pitch + loudness scale with the current volume level (0..1). */
export function playVolumeTick(level: number) {
  try {
    const s = useStore.getState().settings
    if (!s.uiSoundsEnabled) return
  } catch { return }
  const clamped = Math.max(0, Math.min(1, level))
  // Pitch sweeps 320Hz (mute) → 1200Hz (full). Gain scales with level too.
  const freq = 320 + clamped * 880
  const gain = 0.05 + clamped * 0.18
  tone(freq, 0.08, 'sine', gain)
}

export function playUiSound(name: SoundName) {
  try {
    const s = useStore.getState().settings
    if (!s.uiSoundsEnabled) return
    // Per-category toggles (optional, default on)
    if (name === 'hover' && s.hoverSoundsEnabled === false) return
  } catch { return }
  switch (name) {
    case 'start':           tone(660, 0.10, 'sine', 0.18); tone(990, 0.12, 'sine', 0.14, 0.07); break
    case 'pause':           tone(520, 0.10, 'sine', 0.16); tone(390, 0.12, 'sine', 0.14, 0.07); break
    case 'reset':           tone(440, 0.08, 'triangle', 0.14); break
    case 'taskAdd':         tone(880, 0.08, 'sine', 0.14); tone(1175, 0.06, 'sine', 0.10, 0.05); break
    case 'taskDone':        tone(784, 0.10, 'sine', 0.16); tone(1175, 0.14, 'sine', 0.14, 0.08); break
    case 'taskDelete':      tone(330, 0.06, 'triangle', 0.12); tone(220, 0.10, 'triangle', 0.12, 0.05); break
    case 'taskArchive':     tone(523, 0.06, 'sine', 0.12); tone(392, 0.10, 'sine', 0.10, 0.05); break
    case 'taskRestore':     tone(523, 0.06, 'sine', 0.12); tone(784, 0.08, 'sine', 0.12, 0.05); break
    case 'modeSwitch':      tone(700, 0.05, 'sine', 0.12); tone(900, 0.06, 'sine', 0.12, 0.04); break
    case 'tabSwitch':       tone(820, 0.04, 'sine', 0.10); break
    case 'focusOn':         tone(440, 0.08, 'sine', 0.14); tone(660, 0.10, 'sine', 0.14, 0.06); tone(880, 0.14, 'sine', 0.12, 0.13); break
    case 'focusOff':        tone(880, 0.08, 'sine', 0.14); tone(660, 0.10, 'sine', 0.14, 0.06); tone(440, 0.12, 'sine', 0.12, 0.13); break
    case 'sessionComplete': tone(523, 0.12, 'sine', 0.16); tone(659, 0.12, 'sine', 0.16, 0.10); tone(784, 0.16, 'sine', 0.16, 0.20); tone(1046, 0.20, 'sine', 0.16, 0.32); break
    case 'notify':          tone(988, 0.08, 'sine', 0.14); tone(1318, 0.10, 'sine', 0.12, 0.06); break
    case 'toggle':          tone(700, 0.05, 'square', 0.08); break
    case 'hover':           noiseBurst(0.04, 0.025, 1600); break
    case 'click':           tone(600, 0.04, 'square', 0.08); break
  }
}
