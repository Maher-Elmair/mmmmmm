import { Play, Pause, RotateCcw, Maximize2, Flame } from 'lucide-react'
import { Button } from './ui/button'
import { Tip } from './ui/tip'
import { useStore } from '../stores/useStore'
import { motion } from 'motion/react'

const RADIUS = 108
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const MODE_LABELS = {
  pomodoro: 'Focus',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
}

const MODE_COLORS = {
  pomodoro: 'var(--color-primary)',
  shortBreak: '#22c55e',
  longBreak: '#818cf8',
}

export function PomodoroTimer() {
  const mode = useStore(s => s.mode)
  const timeLeft = useStore(s => s.timeLeft)
  const isRunning = useStore(s => s.isRunning)
  const sessionCount = useStore(s => s.sessionCount)
  const settings = useStore(s => s.settings)
  const streak = useStore(s => s.streak)
  const activeTaskId = useStore(s => s.activeTaskId)
  const tasks = useStore(s => s.tasks)
  const setMode = useStore(s => s.setMode)
  const requestStart = useStore(s => s.requestStart)
  const resetTimer = useStore(s => s.resetTimer)
  const setFocusMode = useStore(s => s.setFocusMode)

  const totalTime = {
    pomodoro: settings.pomodoroDuration * 60,
    shortBreak: settings.shortBreakDuration * 60,
    longBreak: settings.longBreakDuration * 60,
  }[mode]

  const progress = timeLeft / totalTime
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const seconds = (timeLeft % 60).toString().padStart(2, '0')
  const modeColor = MODE_COLORS[mode]

  const activeTask = tasks.find(t => t.id === activeTaskId)
  const cyclePos = sessionCount % 4
  const nextBreakIn = 4 - cyclePos
  const isLongBreakNext = cyclePos === 3

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {/* Streak badge */}
      {streak > 0 && (
        <div className="flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-orange-400" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            {streak} Day Streak
          </span>
        </div>
      )}

      {/* Mode tabs */}
      <div className="flex gap-1 rounded-lg bg-secondary p-1">
        {(['pomodoro', 'shortBreak', 'longBreak'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-md px-3 py-1.5 text-sm transition-all ${
              mode === m ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <motion.div
        className="relative select-none"
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <svg width="256" height="256" viewBox="0 0 256 256">
          <circle cx="128" cy="128" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
          <motion.circle
            cx="128" cy="128" r={RADIUS}
            fill="none"
            stroke={modeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 128 128)"
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
          />
        </svg>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full opacity-10 blur-2xl" style={{ background: modeColor }} />

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span
            className="tabular-nums text-foreground"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '3.5rem', fontWeight: 300, lineHeight: 1 }}
          >
            {minutes}:{seconds}
          </span>
          <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{MODE_LABELS[mode]}</span>
          {activeTask && (
            <span className="mt-0.5 max-w-[160px] truncate text-center text-primary" style={{ fontSize: '0.68rem' }}>
              {activeTask.title}
            </span>
          )}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Tip label="Reset timer" hotkey="R">
          <Button
            variant="ghost" size="icon"
            onClick={resetTimer}
            aria-label="Reset timer"
            className="h-10 w-10 cursor-pointer rounded-full text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </Tip>

        <Tip label={isRunning ? 'Pause' : 'Start'} hotkey="Space">
          <Button
            size="lg"
            onClick={requestStart}
            className="h-12 cursor-pointer rounded-full px-8 text-primary-foreground transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: modeColor }}
          >
            {isRunning ? <><Pause className="mr-2 h-4 w-4" />Pause</> : <><Play className="mr-2 h-4 w-4" />Start</>}
          </Button>
        </Tip>

        <Tip label="Focus mode" hotkey="F">
          <Button
            variant="ghost" size="icon"
            onClick={() => setFocusMode(true)}
            aria-label="Focus mode"
            className="h-10 w-10 cursor-pointer rounded-full text-muted-foreground hover:text-foreground"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </Tip>
      </div>

      {/* Session dots + next break hint */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="h-2 w-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i < cyclePos ? 'var(--color-primary)' : 'var(--color-secondary)' }}
            />
          ))}
        </div>
        <span className="text-muted-foreground" style={{ fontSize: '0.72rem' }}>
          {sessionCount} sessions today ·{' '}
          {nextBreakIn === 1 ? `${isLongBreakNext ? 'Long' : 'Short'} break next` : `${nextBreakIn} until ${isLongBreakNext ? 'long' : 'short'} break`}
        </span>
      </div>
    </div>
  )
}
