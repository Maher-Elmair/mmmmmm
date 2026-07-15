import { useStore } from '../stores/useStore'
import { Flag, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-green-400',
}

const QUEUE_LABELS = ['Now', 'Next', 'Then']

export function FocusQueue() {
  const tasks = useStore(s => s.tasks)
  const activeTaskId = useStore(s => s.activeTaskId)

  const pending = tasks.filter(t => t.status !== 'completed' && t.status !== 'archived')
  const activeIdx = pending.findIndex(t => t.id === activeTaskId)
  const start = activeIdx >= 0 ? activeIdx : 0
  const queue = pending.slice(start, start + 3)

  if (queue.length === 0) return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Focus Queue</p>
      <p className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>Add tasks to build your queue</p>
    </div>
  )

  return (
    <div className="space-y-1.5">
      <p className="text-muted-foreground" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Focus Queue</p>
      <div className="space-y-1">
        {queue.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${
              i === 0
                ? 'bg-primary/8 border border-primary/20'
                : 'bg-secondary/50'
            }`}
          >
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 ${i === 0 ? 'bg-primary/15 text-primary' : 'bg-secondary text-muted-foreground'}`}
              style={{ fontSize: '0.6rem', fontWeight: 700 }}
            >
              {QUEUE_LABELS[i]}
            </span>
            <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${PRIORITY_DOT[task.priority]}`} />
            <p className={`flex-1 truncate ${i === 0 ? 'text-foreground' : 'text-muted-foreground'}`} style={{ fontSize: '0.78rem' }}>
              {task.title}
            </p>
            <span className="shrink-0 text-muted-foreground tabular-nums" style={{ fontSize: '0.65rem' }}>
              {task.completedPomodoros}/{task.estimatedPomodoros}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
