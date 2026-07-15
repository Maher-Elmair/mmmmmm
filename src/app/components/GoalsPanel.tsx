import { useState } from 'react'
import { Target, Edit3, Check, X } from 'lucide-react'
import { Input } from './ui/input'
import { Tip } from './ui/tip'
import { useStore } from '../stores/useStore'
import { motion } from 'motion/react'
import { playUiSound } from '../lib/sounds'

interface GoalRowProps {
  label: string
  period: string
  current: number
  target: number
  onUpdateTarget?: (v: number) => void
}

function GoalRow({ label, period, current, target, onUpdateTarget }: GoalRowProps) {
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(target.toString())
  const pct = Math.min(100, Math.round((current / target) * 100))
  const done = pct >= 100

  const save = () => {
    const v = parseInt(editVal)
    if (v > 0 && onUpdateTarget) { onUpdateTarget(v); playUiSound('taskDone') }
    else playUiSound('reset')
    setEditing(false)
  }

  const R = 18
  const C = 2 * Math.PI * R

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/30 px-3 py-2 transition-colors hover:border-primary/30 hover:bg-secondary/50">
      {/* Mini ring */}
      <div className="relative shrink-0">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r={R} fill="none" stroke="var(--color-secondary)" strokeWidth="3.5" />
          <motion.circle
            cx="22" cy="22" r={R}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={C}
            transform="rotate(-90 22 22)"
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - pct / 100) }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="tabular-nums text-foreground" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
            {pct}
          </span>
        </div>
      </div>

      {/* Label + numbers */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-foreground" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label}</p>
          {editing ? (
            <div className="flex items-center gap-0.5">
              <Input
                autoFocus
                value={editVal}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={e => setEditVal(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { playUiSound('reset'); setEditing(false) } }}
                className="h-6 w-12 border-0 bg-background px-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button aria-label="Save" onClick={save} className="rounded p-0.5 text-primary hover:bg-primary/10"><Check className="h-3 w-3" /></button>
              <button aria-label="Cancel" onClick={() => { playUiSound('reset'); setEditing(false) }} className="rounded p-0.5 text-muted-foreground hover:bg-secondary"><X className="h-3 w-3" /></button>
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="tabular-nums text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '1.1rem', fontWeight: 600, lineHeight: 1 }}>
                {current}
              </span>
              <span className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>/ {target}</span>
              <Tip label="Edit target">
                <button
                  onClick={() => { setEditing(true); playUiSound('click') }}
                  className="ml-1 cursor-pointer rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                >
                  <Edit3 className="h-3 w-3" />
                </button>
              </Tip>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-muted-foreground" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            {period}
          </span>
          <span className="text-muted-foreground" style={{ fontSize: '0.7rem' }}>
            {done ? 'Reached' : `${target - current} to go`}
          </span>
        </div>
      </div>
    </div>
  )
}

export function GoalsPanel() {
  const dailyGoal = useStore(s => s.dailyGoal)
  const weeklyGoal = useStore(s => s.weeklyGoal)
  const monthlyGoal = useStore(s => s.monthlyGoal)
  const dailyHistory = useStore(s => s.dailyHistory)
  const updateGoals = useStore(s => s.updateGoals)

  // Today's progress is read from the *persisted* per-day history so the
  // number survives page refresh AND rolls over correctly at midnight.
  // Using the live `sessionCount` (which is a cumulative cycle counter) is
  // incorrect because it grows indefinitely and double-counts in week/month.
  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  const todaySessions = dailyHistory.find(d => d.date === todayStr)?.sessions ?? 0

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })
  const weekSessions = weekDates.reduce(
    (s, date) => s + (dailyHistory.find(d => d.date === date)?.sessions ?? 0),
    0,
  )
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  const monthSessions = dailyHistory
    .filter(d => d.date >= monthStart)
    .reduce((s, d) => s + d.sessions, 0)

  const totalPct = Math.round(
    ((Math.min(todaySessions, dailyGoal) / dailyGoal) +
      (Math.min(weekSessions, weeklyGoal) / weeklyGoal) +
      (Math.min(monthSessions, monthlyGoal) / monthlyGoal)) / 3 * 100
  )

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Target className="h-3.5 w-3.5 text-primary" />
          </div>
          <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Goals</h3>
        </div>
        <span className="text-muted-foreground" style={{ fontSize: '0.72rem' }}>
          {totalPct}% overall
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <GoalRow
          label="Daily"
          period="Today"
          current={todaySessions}
          target={dailyGoal}
          onUpdateTarget={v => updateGoals({ daily: v })}
        />
        <GoalRow
          label="Weekly"
          period="This Week"
          current={weekSessions}
          target={weeklyGoal}
          onUpdateTarget={v => updateGoals({ weekly: v })}
        />
        <GoalRow
          label="Monthly"
          period="This Month"
          current={monthSessions}
          target={monthlyGoal}
          onUpdateTarget={v => updateGoals({ monthly: v })}
        />
      </div>
    </div>
  )
}
