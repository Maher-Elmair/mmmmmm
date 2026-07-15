import { useState } from 'react'
import { Clock, Timer, Coffee, Moon, History, Inbox } from 'lucide-react'
import { useStore } from '../stores/useStore'
import { ScrollArea } from './ui/scroll-area'
import { motion } from 'motion/react'
import { playUiSound } from '../lib/sounds'
import { isToday, isYesterday } from '../lib/dateUtils'

const MODE_LABELS = { pomodoro: 'Focus', shortBreak: 'Short Break', longBreak: 'Long Break' }
const MODE_ICONS = { pomodoro: Timer, shortBreak: Coffee, longBreak: Moon }
const MODE_COLORS = { pomodoro: 'text-primary bg-primary/10', shortBreak: 'text-green-400 bg-green-500/10', longBreak: 'text-purple-400 bg-purple-500/10' }

function formatSessionTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function isThisWeek(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const weekAgo = new Date(now)
  weekAgo.setDate(now.getDate() - 7)
  return d >= weekAgo
}

export function SessionHistory() {
  const [filter, setFilter] = useState<'today' | 'yesterday' | 'week'>('today')
  const { sessionHistory } = useStore()

  const filtered = sessionHistory.filter(s => {
    if (filter === 'today') return isToday(s.completedAt)
    if (filter === 'yesterday') return isYesterday(s.completedAt)
    return isThisWeek(s.completedAt)
  })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Session History</h3>
        </div>
        <div className="flex gap-1">
          {(['today', 'yesterday', 'week'] as const).map(f => (
            <button
              key={f}
              onClick={() => { if (filter !== f) { setFilter(f); playUiSound('tabSwitch') } }}
              className={`rounded px-2 py-1 capitalize transition-colors ${filter === f ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              style={{ fontSize: '0.75rem' }}
            >
              {f === 'week' ? 'Week' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[13rem]">
        {filtered.length === 0 ? (
          <div className="flex h-[13rem] flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Inbox className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>No sessions completed yet</p>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Start a focus session to see history here</p>
          </div>
        ) : (
          <div className="relative space-y-1 pr-2">
            {/* Timeline line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-px bg-border" />

            {filtered.map((item, i) => {
              const Icon = MODE_ICONS[item.mode]
              const colorClass = MODE_COLORS[item.mode]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ x: 3 }}
                  className="flex items-start gap-3 py-1.5 pl-1"
                >
                  <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${colorClass.split(' ')[1]}`}>
                    <Icon className={`h-3.5 w-3.5 ${colorClass.split(' ')[0]}`} />
                  </div>
                  <motion.div
                    whileHover={{ borderColor: 'rgba(249,115,22,0.4)', backgroundColor: 'rgba(249,115,22,0.04)' }}
                    className="flex-1 min-w-0 rounded-lg border border-border bg-card px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                        {item.taskTitle ?? MODE_LABELS[item.mode]}
                      </span>
                      <span className="shrink-0 tabular-nums text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                        {item.duration}min
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                      <Clock className="h-3 w-3" />
                      <span>{formatSessionTime(item.completedAt)}</span>
                      <span className="rounded-sm bg-secondary px-1 py-0.5">{MODE_LABELS[item.mode]}</span>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
