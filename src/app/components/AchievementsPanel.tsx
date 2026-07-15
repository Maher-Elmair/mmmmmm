import { type ComponentType } from 'react'
import { Award, Flame, Zap, Star, Trophy, Timer, Target, TrendingUp, Lock, Check } from 'lucide-react'
import { useStore } from '../stores/useStore'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { motion } from 'motion/react'
import { playUiSound } from '../lib/sounds'

interface Achievement {
  id: string
  icon: ComponentType<{ className?: string }>
  label: string
  description: string
  unlocked: boolean
  progress: number
  total: number
}

export function AchievementsPanel() {
  const totalSessions = useStore(s => s.totalSessions)
  const streak = useStore(s => s.streak)
  const todaySessions = useStore(s => s.todaySessions)
  const dailyGoal = useStore(s => s.dailyGoal)

  const achievements: Achievement[] = [
    { id: 'first',   icon: Timer,     label: 'First Focus',   description: 'Complete your first session',       unlocked: totalSessions >= 1,   progress: Math.min(1, totalSessions),   total: 1   },
    { id: 's10',     icon: Star,      label: '10 Sessions',   description: 'Complete 10 sessions total',        unlocked: totalSessions >= 10,  progress: Math.min(10, totalSessions),  total: 10  },
    { id: 's100',    icon: Trophy,    label: 'Century',       description: 'Complete 100 sessions',             unlocked: totalSessions >= 100, progress: Math.min(100, totalSessions), total: 100 },
    { id: 's500',    icon: Award,     label: 'Legend',        description: '500 total sessions',                unlocked: totalSessions >= 500, progress: Math.min(500, totalSessions), total: 500 },
    { id: 'streak7', icon: Flame,     label: '7-Day Streak',  description: 'Focus 7 days in a row',             unlocked: streak >= 7,          progress: Math.min(7, streak),          total: 7   },
    { id: 'str30',   icon: Zap,       label: '30-Day Streak', description: 'Focus 30 days in a row',            unlocked: streak >= 30,         progress: Math.min(30, streak),         total: 30  },
    { id: 'goal',    icon: Target,    label: 'Goal Crusher',  description: 'Hit your daily session goal',       unlocked: todaySessions >= dailyGoal, progress: Math.min(dailyGoal, todaySessions), total: dailyGoal },
    { id: 'prod',    icon: TrendingUp, label: 'Productive',   description: 'Complete 5+ sessions in a day',    unlocked: todaySessions >= 5 || totalSessions >= 100, progress: Math.min(5, todaySessions), total: 5 },
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Award className="h-3.5 w-3.5 text-primary" />
            </div>
            <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Achievements</h3>
          </div>
          <span className="text-muted-foreground" style={{ fontSize: '0.72rem' }}>
            {unlockedCount}/{achievements.length} unlocked
          </span>
        </div>

        <div className="grid flex-1 grid-cols-4 content-start gap-2">
          {achievements.map(a => {
            const Icon = a.unlocked ? a.icon : Lock
            const pct = Math.round((a.progress / a.total) * 100)
            return (
              <Tooltip key={a.id}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    onHoverStart={() => playUiSound('hover')}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2 transition-all cursor-default ${
                      a.unlocked
                        ? 'border-primary/20 bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      a.unlocked ? 'bg-primary/15' : 'bg-secondary'
                    }`}>
                      <Icon className={`h-4.5 w-4.5 ${a.unlocked ? 'text-primary' : 'text-muted-foreground/40'}`} style={{ width: '1.05rem', height: '1.05rem' }} />
                    </div>

                    <span
                      className={`text-center leading-tight ${a.unlocked ? 'text-foreground' : 'text-muted-foreground/50'}`}
                      style={{ fontSize: '0.7rem', fontWeight: 500 }}
                    >
                      {a.label}
                    </span>

                    {!a.unlocked && (
                      <div className="w-full overflow-hidden rounded-full bg-secondary" style={{ height: 3 }}>
                        <div
                          className="h-full rounded-full bg-primary/40 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                    {a.unlocked && (
                      <Check className="h-3 w-3 text-primary" />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div style={{ fontSize: '0.78rem' }}>
                    <p style={{ fontWeight: 500 }}>{a.label}</p>
                    <p className="text-muted-foreground">{a.description}</p>
                    {!a.unlocked && (
                      <p className="text-primary mt-0.5">{a.progress}/{a.total} ({pct}%)</p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
