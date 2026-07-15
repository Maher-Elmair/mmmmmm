import { useEffect } from 'react'
import { X, Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { useStore } from '../stores/useStore'
import { motion, AnimatePresence } from 'motion/react'
import { Tip } from './ui/tip'

// Timer state is fully managed by TimerController — this component only reads/displays it.

const MODE_LABELS = { pomodoro: 'Focus', shortBreak: 'Short Break', longBreak: 'Long Break' }
const MODE_COLORS = { pomodoro: '#f97316', shortBreak: '#22c55e', longBreak: '#818cf8' }
const MODE_GLOW   = { pomodoro: '#fb923c', shortBreak: '#4ade80', longBreak: '#a5b4fc' }
const RADIUS = 150
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const SVG_SIZE = 370
const SVG_CENTER = SVG_SIZE / 2

export function FocusMode() {
  const {
    isFocusMode, setFocusMode,
    mode, timeLeft, isRunning, sessionCount, settings,
    setIsRunning, requestStart, resetTimer, setMode,
    activeTaskId, tasks,
  } = useStore()

  const activeTask = tasks.find(t => t.id === activeTaskId)
  const totalTime = {
    pomodoro: settings.pomodoroDuration * 60,
    shortBreak: settings.shortBreakDuration * 60,
    longBreak: settings.longBreakDuration * 60,
  }[mode]

  const progress = timeLeft / totalTime
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const secs = (timeLeft % 60).toString().padStart(2, '0')
  const modeColor = MODE_COLORS[mode]
  const glowColor = MODE_GLOW[mode]
  const percent = Math.round((1 - progress) * 100)
  const elapsedSec = Math.max(0, totalTime - timeLeft)
  const elapsedMin = Math.floor(elapsedSec / 60).toString().padStart(2, '0')
  const elapsedS = (elapsedSec % 60).toString().padStart(2, '0')
  const cyclePos = sessionCount % 4

  // Keyboard shortcuts (in focus mode)
  useEffect(() => {
    if (!isFocusMode) return
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      const state = useStore.getState()
      if (e.code === 'Space') { e.preventDefault(); state.requestStart() }
      if (e.code === 'KeyR' && !e.metaKey && !e.ctrlKey) state.resetTimer()
      if (e.code === 'Escape') state.setFocusMode(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isFocusMode])

  return (
    <AnimatePresence>
      {isFocusMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background text-foreground"
        >
          {/* Soft ambient glow — single static layer, no rotation */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(55% 45% at 50% 38%, ${modeColor}26 0%, transparent 70%)` }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
          />

          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 py-5">
            <div className="flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur-md" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                animate={{ scale: isRunning ? [1, 1.6, 1] : 1, opacity: isRunning ? [0.6, 1, 0.6] : 0.9 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ backgroundColor: modeColor, boxShadow: `0 0 10px ${modeColor}` }}
              />
              <span className="text-muted-foreground">Focus Mode</span>
              <span className="text-foreground/70">· {isRunning ? 'In session' : 'Paused'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tip label="Exit focus mode" hotkey="Esc">
                <button
                  onClick={() => setFocusMode(false)}
                  aria-label="Exit focus mode"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-secondary hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </Tip>
            </div>
          </div>

          {/* Centerpiece */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Mode tabs — above the ring */}
            <div className="flex gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur-md shadow-lg">
              {(['pomodoro', 'shortBreak', 'longBreak'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative rounded-full px-5 py-1.5 transition-colors ${
                    mode === m ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.02em' }}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="focus-mode-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: `${modeColor}22`, border: `1px solid ${modeColor}55` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{MODE_LABELS[m]}</span>
                </button>
              ))}
            </div>

            {/* Giant timer ring */}
            <div className="relative">
              <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={glowColor} />
                    <stop offset="100%" stopColor={modeColor} />
                  </linearGradient>
                </defs>
                {/* tick marks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
                  const r1 = RADIUS + 14
                  const r2 = RADIUS + (i % 5 === 0 ? 22 : 18)
                  const x1 = SVG_CENTER + Math.cos(angle) * r1
                  const y1 = SVG_CENTER + Math.sin(angle) * r1
                  const x2 = SVG_CENTER + Math.cos(angle) * r2
                  const y2 = SVG_CENTER + Math.sin(angle) * r2
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" className={i % 5 === 0 ? 'text-muted-foreground/50' : 'text-muted-foreground/20'} strokeWidth={i % 5 === 0 ? 1.5 : 1} strokeLinecap="round" />
                })}
                <circle cx={SVG_CENTER} cy={SVG_CENTER} r={RADIUS} fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary/60" />
                <circle
                  cx={SVG_CENTER} cy={SVG_CENTER} r={RADIUS}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${SVG_CENTER} ${SVG_CENTER})`}
                  style={{ transition: 'stroke-dashoffset 0.9s linear', filter: `drop-shadow(0 0 14px ${modeColor}cc)` }}
                />
              </svg>

              {/* Inner glow — subtle, static */}
              <div
                className="pointer-events-none absolute inset-12 rounded-full blur-3xl opacity-20"
                style={{ background: modeColor }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-muted-foreground tabular-nums" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.24em' }}>
                  {percent}%
                </span>
                <span
                  className="tabular-nums"
                  style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '5.25rem', fontWeight: 200, lineHeight: 1, letterSpacing: '-0.05em', color: modeColor, textShadow: `0 0 30px ${modeColor}55` }}
                >
                  {minutes}:{secs}
                </span>
                <div className="flex items-center gap-2.5 text-muted-foreground" style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  <span>{MODE_LABELS[mode]}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span className="tabular-nums">{elapsedMin}:{elapsedS} elapsed</span>
                </div>
                {activeTask && (
                  <div className="mt-1 flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 backdrop-blur-md">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: modeColor }} />
                    <span className="max-w-[200px] truncate text-foreground" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                      {activeTask.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-5">
              <Tip label="Reset timer" hotkey="R">
                <Button
                  variant="ghost" size="icon"
                  onClick={resetTimer}
                  aria-label="Reset timer"
                  className="h-11 w-11 cursor-pointer rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur-md transition-all hover:bg-secondary hover:text-foreground"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </Tip>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={requestStart}
                className="relative flex h-14 items-center justify-center rounded-full px-10 text-white"
                style={{
                  background: `linear-gradient(135deg, ${glowColor}, ${modeColor})`,
                  boxShadow: `0 14px 40px -12px ${modeColor}, inset 0 1px 0 rgba(255,255,255,0.25)`,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-40" style={{ background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5), transparent 50%)` }} />
                {isRunning ? <><Pause className="mr-2 h-5 w-5" fill="currentColor" />Pause</> : <><Play className="mr-2 h-5 w-5" fill="currentColor" />Start</>}
              </motion.button>

              <div className="h-11 w-11" />
            </div>

            {/* Sessions today — below the Start button */}
            <div className="flex items-center gap-2" style={{ fontSize: '0.7rem' }}>
              <div className="flex items-center gap-1">
                {Array.from({ length: 4 }, (_, i) => {
                  const filled = i < cyclePos
                  return (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: filled ? modeColor : 'var(--color-secondary)',
                        boxShadow: filled ? `0 0 6px ${modeColor}66` : undefined,
                      }}
                    />
                  )
                })}
              </div>
              <span className="text-muted-foreground">
                <span className="text-foreground" style={{ fontWeight: 600 }}>{sessionCount}</span> session{sessionCount === 1 ? '' : 's'} today
              </span>
            </div>
          </motion.div>

          {/* Keyboard hints — raised */}
          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-4 text-muted-foreground/70" style={{ fontSize: '0.62rem' }}>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border/60 bg-card/40 px-1.5 py-0.5 backdrop-blur-sm" style={{ fontFamily: 'monospace', fontSize: '0.55rem' }}>Space</kbd>
              <span>Start / Pause</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border/60 bg-card/40 px-1.5 py-0.5 backdrop-blur-sm" style={{ fontFamily: 'monospace', fontSize: '0.55rem' }}>R</kbd>
              <span>Reset</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-border/60 bg-card/40 px-1.5 py-0.5 backdrop-blur-sm" style={{ fontFamily: 'monospace', fontSize: '0.55rem' }}>Esc</kbd>
              <span>Exit</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
