import { Clock, Target, Flame, Timer } from 'lucide-react'
import { useStore } from '../stores/useStore'
import { motion } from 'motion/react'

export function TodaySummary() {
  const dailyGoal = useStore(s => s.dailyGoal)
  const streak = useStore(s => s.streak)
  const dailyHistory = useStore(s => s.dailyHistory)
  const tasks = useStore(s => s.tasks)
  const settings = useStore(s => s.settings)

  // Read today's numbers from persisted history so they survive refresh and
  // roll over at midnight correctly (no cumulative double-counting).
  const today = new Date().toISOString().split('T')[0]
  const todayEntry = dailyHistory.find(d => d.date === today)
  const todaySessions = todayEntry?.sessions ?? 0
  const todayMins = todayEntry?.focusMinutes ?? 0
  const focusDisplay = todayMins >= 60 ? `${(todayMins / 60).toFixed(1)}h` : `${todayMins}m`
  const completedToday = tasks.filter(t => t.status === 'completed' && t.completedAt?.startsWith(today)).length
  const pct = Math.min(100, Math.round((todaySessions / dailyGoal) * 100))

  const stats = [
    { icon: Clock, label: 'Focus time', value: focusDisplay, color: 'text-primary' },
    { icon: Timer, label: 'Sessions', value: `${todaySessions}/${dailyGoal}`, color: 'text-primary' },
    { icon: Target, label: 'Tasks done', value: `${completedToday}`, color: 'text-emerald-600 dark:text-emerald-400' },
    { icon: Flame, label: 'Streak', value: `${streak}d`, color: 'text-orange-600 dark:text-orange-400' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Today</h3>
          <p className="text-muted-foreground" style={{ fontSize: '0.72rem' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className="text-right">
          <span
            className={`tabular-nums ${pct >= 100 ? 'text-primary' : 'text-muted-foreground'}`}
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700, fontSize: '1.25rem' }}
          >
            {pct}%
          </span>
          <p className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>of goal</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stats.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className="cursor-default select-none rounded-xl bg-secondary/50 px-2 py-2.5 text-center transition-colors hover:bg-primary/10"
          >
            <Icon className={`mx-auto mb-1 h-3.5 w-3.5 ${color}`} />
            <p className={`tabular-nums ${color}`} style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.1 }}>
              {value}
            </p>
            <p className="mt-0.5 text-muted-foreground" style={{ fontSize: '0.62rem' }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Goal progress bar */}
      <div className="space-y-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <p className="text-muted-foreground" style={{ fontSize: '0.68rem' }}>
          {pct >= 100
            ? 'Daily goal reached'
            : `${dailyGoal - todaySessions} more session${dailyGoal - todaySessions !== 1 ? 's' : ''} to hit your goal`}
        </p>
      </div>
    </div>
  )
}
