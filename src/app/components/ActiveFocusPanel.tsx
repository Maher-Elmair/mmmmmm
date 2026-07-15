import { Timer, Flag, ChevronRight } from 'lucide-react'
import { Badge } from './ui/badge'
import { useStore } from '../stores/useStore'
import { motion, AnimatePresence } from 'motion/react'

const PRIORITY_COLORS = {
  urgent: 'bg-rose-600/10 text-rose-300 border-rose-600/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
}

export function ActiveFocusPanel() {
  const activeTaskId = useStore(s => s.activeTaskId)
  const tasks = useStore(s => s.tasks)
  const isRunning = useStore(s => s.isRunning)
  const settings = useStore(s => s.settings)
  const mode = useStore(s => s.mode)
  const activeTask = tasks.find(t => t.id === activeTaskId && t.status !== 'completed' && t.status !== 'archived')

  if (!activeTask) return (
    <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-border px-4 py-3 text-muted-foreground">
      <Timer className="h-4 w-4 shrink-0" />
      <span style={{ fontSize: '0.8125rem' }}>Select a task from the list to start focusing</span>
    </div>
  )

  const remaining = activeTask.estimatedPomodoros - activeTask.completedPomodoros
  const remainingMins = remaining * settings.pomodoroDuration

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTask.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        className={`rounded-xl border p-3.5 ${isRunning && mode === 'pomodoro' ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`}
      >
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isRunning && mode === 'pomodoro' ? 'bg-primary/15' : 'bg-secondary'}`}>
            <Timer className={`h-3.5 w-3.5 ${isRunning && mode === 'pomodoro' ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`px-1.5 py-0 text-xs border ${PRIORITY_COLORS[activeTask.priority]}`}>
                <Flag className="mr-1 h-2.5 w-2.5" />
                {activeTask.priority}
              </Badge>
            </div>
            <p className="mt-1.5 text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.4 }}>
              {activeTask.title}
            </p>
            {activeTask.description && (
              <p className="mt-1 text-muted-foreground line-clamp-2" style={{ fontSize: '0.75rem' }}>
                {activeTask.description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-3">
              <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                <Timer className="h-3 w-3" />
                {activeTask.completedPomodoros}/{activeTask.estimatedPomodoros}
              </span>
              <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>
                ~{remainingMins}min left
              </span>
            </div>
            {/* Mini progress */}
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.min(100, (activeTask.completedPomodoros / activeTask.estimatedPomodoros) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
