import { type ComponentType, useMemo } from 'react'
import { Clock, Zap, Flame, Target, TrendingUp, Award, Calendar } from 'lucide-react'
import { useStore } from '../stores/useStore'
import { motion } from 'motion/react'

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={`rounded-xl border p-3.5 transition-colors hover:border-primary/30 ${accent ? 'border-primary/20 bg-primary/5' : 'border-border bg-card'}`}
    >
      <motion.div
        whileHover={{ rotate: -8, scale: 1.1 }}
        className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${accent ? 'bg-primary/15' : 'bg-secondary'}`}
      >
        <Icon className={`h-3.5 w-3.5 ${accent ? 'text-primary' : 'text-muted-foreground'}`} />
      </motion.div>
      <div className="mt-3">
        <p className={`tabular-nums ${accent ? 'text-primary' : 'text-foreground'}`}
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.1 }}>
          {value}
        </p>
        <p className="mt-0.5 text-muted-foreground" style={{ fontSize: '0.75rem' }}>{label}</p>
        {sub && <p className="mt-0.5 text-primary/60" style={{ fontSize: '0.7rem' }}>{sub}</p>}
      </div>
    </motion.div>
  )
}

export function StatsPanel() {
  const todaySessions = useStore(s => s.todaySessions)
  const totalSessions = useStore(s => s.totalSessions)
  const dailyGoal = useStore(s => s.dailyGoal)
  const streak = useStore(s => s.streak)
  const dailyHistory = useStore(s => s.dailyHistory)
  const settings = useStore(s => s.settings)

  const { todayDisplay, weekHours, weekSessions, monthHours, monthSessions, dailyGoalPct, score } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayEntry = dailyHistory.find(d => d.date === today)
    // todaySessions is the local counter (immediately updated on completion).
    // dailyHistory may lag until the DB trigger fires. Use todaySessions as the
    // primary count; use dailyHistory.focusMinutes only as a baseline when the
    // DB entry exists, to avoid double-counting.
    const todayMins = todayEntry
      ? todayEntry.focusMinutes
      : todaySessions * settings.pomodoroDuration
    const todayDisplay = todayMins >= 60 ? `${(todayMins / 60).toFixed(1)}h` : `${todayMins}m`

    const now = new Date()
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now); d.setDate(d.getDate() - (6 - i)); return d.toISOString().split('T')[0]
    })
    // For week/month: dailyHistory includes past days accurately. For today,
    // use todaySessions (local counter) since dailyHistory may lag.
    const pastWeekSessions = weekDates.slice(0, -1).reduce((s, date) => s + (dailyHistory.find(d => d.date === date)?.sessions ?? 0), 0)
    const weekSessions = pastWeekSessions + todaySessions
    const weekHours = (weekSessions * settings.pomodoroDuration / 60).toFixed(1)

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    const pastMonthSessions = dailyHistory.filter(d => d.date >= monthStart && d.date !== today).reduce((s, d) => s + d.sessions, 0)
    const monthSessions = pastMonthSessions + todaySessions
    const monthHours = (monthSessions * settings.pomodoroDuration / 60).toFixed(0)

    const dailyGoalPct = Math.min(100, Math.round((todaySessions / dailyGoal) * 100))

    const recentDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now); d.setDate(d.getDate() - i); return d.toISOString().split('T')[0]
    })
    const activeDays = recentDates.filter(date => {
      if (date === today) return todaySessions > 0
      return (dailyHistory.find(d => d.date === date)?.sessions ?? 0) > 0
    }).length
    const score = Math.round(((activeDays / 7) * 40) + (Math.min(100, (weekSessions / (dailyGoal * 7)) * 100) * 0.6))

    return { todayDisplay, weekHours, weekSessions, monthHours, monthSessions, dailyGoalPct, score }
  }, [todaySessions, totalSessions, dailyGoal, streak, dailyHistory, settings.pomodoroDuration])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Performance Overview</h3>
        <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard icon={Clock}     label="Focus today"  value={todayDisplay}        sub={`${todaySessions} sessions`} accent />
        <StatCard icon={TrendingUp} label="This week"   value={`${weekHours}h`}      sub={`${weekSessions} sessions`} />
        <StatCard icon={Calendar}   label="This month"  value={`${monthHours}h`}     sub={`${monthSessions} sessions`} />
        <StatCard icon={Flame}      label="Streak"      value={`${streak}d`}         sub="days in a row" accent />
        <StatCard icon={Award}      label="All time"    value={`${totalSessions}`}   sub="total sessions" />
        <StatCard icon={Zap}        label="Score"       value={`${score}`}           sub={`${dailyGoalPct}% of goal`} accent={score >= 70} />
      </div>
    </div>
  )
}
