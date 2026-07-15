import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { useStore, type NotificationItem } from '../stores/useStore'
import {
  Bell, CheckCircle2, Coffee, Trophy, Target, Timer, Clock, Pin,
  Check, Inbox, X, Trash2, ChevronRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Tip } from './ui/tip'
import { isToday, isYesterday } from '../lib/dateUtils'

const NOTIF_META = {
  session_complete: { icon: CheckCircle2, color: 'text-primary',   bg: 'bg-primary/10' },
  break_complete:   { icon: Coffee,       color: 'text-green-400', bg: 'bg-green-500/10' },
  task_complete:    { icon: Trophy,       color: 'text-yellow-400',bg: 'bg-yellow-500/10' },
  goal_achieved:    { icon: Target,       color: 'text-purple-400',bg: 'bg-purple-500/10' },
}

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime()
  if (ms < 60000) return 'Just now'
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ago`
  if (ms < 86400000) return `${Math.floor(ms / 3600000)}h ago`
  return new Date(iso).toLocaleDateString()
}

function dateGroupLabel(iso: string) {
  if (isToday(iso)) return 'Today'
  if (isYesterday(iso)) return 'Yesterday'
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
}

function NotifRow({ item, onDismiss }: { item: NotificationItem; onDismiss: () => void }) {
  const { icon: Icon, color, bg } = NOTIF_META[item.type]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: item.read ? 0.6 : 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      className="group flex gap-3 rounded-xl border border-border bg-card/50 p-3 hover:bg-card transition-colors"
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="text-foreground" style={{ fontSize: '0.8rem', fontWeight: 500, lineHeight: 1.4 }}>{item.title}</p>
          <div className="flex items-center gap-1 shrink-0">
            {!item.read && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
            <button
              aria-label="Dismiss notification"
              onClick={onDismiss}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-0.5 rounded"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{item.message}</p>
        <p className="mt-0.5 text-muted-foreground" style={{ fontSize: '0.7rem' }}>{timeAgo(item.timestamp)}</p>
      </div>
    </motion.div>
  )
}

// ─── Live Status (subscribes to timer state — only renders when panel is open)
function LiveStatus() {
  const mode = useStore(s => s.mode)
  const timeLeft = useStore(s => s.timeLeft)
  const isRunning = useStore(s => s.isRunning)
  const todaySessions = useStore(s => s.todaySessions)
  const dailyGoal = useStore(s => s.dailyGoal)
  const activeTaskId = useStore(s => s.activeTaskId)
  const tasks = useStore(s => s.tasks)
  const settings = useStore(s => s.settings)
  const dailyHistory = useStore(s => s.dailyHistory)
  const activeTask = tasks.find(t => t.id === activeTaskId)
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const secs = (timeLeft % 60).toString().padStart(2, '0')
  const modeLabel = { pomodoro: 'Focus', shortBreak: 'Short Break', longBreak: 'Long Break' }[mode]
  const today = new Date().toISOString().split('T')[0]
  const todayMins = ((dailyHistory.find(d => d.date === today)?.focusMinutes) ?? 0) + todaySessions * settings.pomodoroDuration

  return (
    <div className="rounded-xl border border-border bg-card/60 overflow-hidden">
      <div className="px-3.5 py-2 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-1.5">
          <div className={`h-1.5 w-1.5 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-muted-foreground'}`} />
          <span className="text-foreground" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            {isRunning ? 'Session active' : 'Timer paused'}
          </span>
        </div>
      </div>
      <div className="p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
            <Timer className="h-3.5 w-3.5" />{modeLabel}
          </span>
          <span className="tabular-nums text-foreground" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700, fontSize: '1.125rem' }}>
            {mins}:{secs}
          </span>
        </div>
        {activeTask && (
          <p className="flex items-center gap-1.5 truncate text-muted-foreground" style={{ fontSize: '0.75rem' }}>
            <Pin className="h-3 w-3 shrink-0" />
            <span className="truncate">{activeTask.title}</span>
          </p>
        )}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="rounded-lg bg-secondary/50 px-2.5 py-2 text-center">
            <p className="text-foreground tabular-nums" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700, fontSize: '1rem' }}>
              {todayMins >= 60 ? `${(todayMins / 60).toFixed(1)}h` : `${todayMins}m`}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>Focus today</p>
          </div>
          <div className="rounded-lg bg-secondary/50 px-2.5 py-2 text-center">
            <p className="text-foreground tabular-nums" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700, fontSize: '1rem' }}>
              {todaySessions}/{dailyGoal}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: '0.65rem' }}>Sessions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NotificationCenter() {
  const isNotificationCenterOpen = useStore(s => s.isNotificationCenterOpen)
  const setNotificationCenterOpen = useStore(s => s.setNotificationCenterOpen)
  const notifications = useStore(s => s.notifications)
  const markAllNotificationsRead = useStore(s => s.markAllNotificationsRead)

  // Clear a single notification (local dismiss via store)
  const dismiss = (id: string) => {
    useStore.setState(s => ({ notifications: s.notifications.filter(n => n.id !== id) }))
  }
  const clearAll = () => useStore.setState({ notifications: [] })

  const unread = notifications.filter(n => !n.read).length

  // Group notifications by actual date. The first group ("Today") collapses
  // anything from the current calendar day; older entries are grouped under
  // their real date so old items are never mislabeled as "Today".
  const groupedNotifs = (() => {
    const groups: { label: string; key: string; items: NotificationItem[] }[] = []
    for (const n of notifications) {
      const key = new Date(n.timestamp).toDateString()
      const found = groups.find(g => g.key === key)
      if (found) found.items.push(n)
      else groups.push({ key, label: dateGroupLabel(n.timestamp), items: [n] })
    }
    return groups
  })()

  return (
    <Sheet open={isNotificationCenterOpen} onOpenChange={setNotificationCenterOpen}>
      <SheetContent
        className="flex flex-col gap-0 p-0 w-full sm:max-w-[360px] [&>button.absolute]:hidden"
        side="right"
        style={{ height: '100dvh' }}
      >
        <SheetTitle className="sr-only">Notifications</SheetTitle>
        <SheetDescription className="sr-only">Recent focus session, break, task, and goal notifications.</SheetDescription>
        {/* ── Sticky header ─────────────────────────────────────────────── */}
        <div className="shrink-0 border-b border-border px-5 py-3.5 space-y-2.5">
          {/* Row 1: title + close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <h2 className="text-foreground" style={{ fontWeight: 600, fontSize: '1rem' }}>Notifications</h2>
              {unread > 0 && (
                <Badge className="bg-primary/15 text-primary border-primary/20 px-1.5 py-0 text-xs">{unread}</Badge>
              )}
            </div>
            <Tip label="Close" hotkey="Esc">
              <button
                aria-label="Close notifications"
                onClick={() => setNotificationCenterOpen(false)}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:bg-card hover:text-foreground transition-all"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Tip>
          </div>

          {/* Row 2: actions */}
          {notifications.length > 0 && (
            <div className="flex items-center gap-1">
              {unread > 0 && (
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-muted-foreground hover:text-foreground px-2" onClick={markAllNotificationsRead} style={{ fontSize: '0.75rem' }}>
                  <Check className="h-3 w-3" />
                  Read all
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-7 gap-1 text-muted-foreground hover:text-destructive px-2" onClick={clearAll} style={{ fontSize: '0.75rem' }}>
                <Trash2 className="h-3 w-3" />
                Clear
              </Button>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 min-h-0 [&>[data-radix-scroll-area-viewport]]:max-h-full">
          <div className="px-4 py-4 space-y-5">
            {/* Live status widget — only re-renders on timer tick when panel is open */}
            {isNotificationCenterOpen && <LiveStatus />}

            {/* Grouped notifications */}
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                  <Inbox className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-foreground" style={{ fontSize: '0.9375rem', fontWeight: 500 }}>You're all caught up</p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: '0.8rem' }}>No notifications yet</p>
                </div>
              </div>
            ) : (
              <>
                {groupedNotifs.map(group => (
                  <div key={group.key} className="space-y-2">
                    <p className="text-muted-foreground px-1" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {group.label}
                    </p>
                    <AnimatePresence>
                      {group.items.map(n => <NotifRow key={n.id} item={n} onDismiss={() => dismiss(n.id)} />)}
                    </AnimatePresence>
                  </div>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
