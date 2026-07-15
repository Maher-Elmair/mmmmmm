import { useEffect, lazy, Suspense, type ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion } from 'motion/react'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { toast } from 'sonner'
import { useStore } from './stores/useStore'
import { useAuthSession } from './hooks/useAuthSession'
import { startSync, stopSync } from './lib/cloud/sync'

import { Header } from './components/Header'
import { PomodoroTimer } from './components/PomodoroTimer'
import { TaskManager } from './components/TaskManager'
import { StatsPanel } from './components/StatsPanel'
const AnalyticsPanel = lazy(() => import('./components/AnalyticsPanel').then(m => ({ default: m.AnalyticsPanel })))
import { SettingsDrawer } from './components/SettingsDrawer'
const BackgroundSounds = lazy(() => import('./components/BackgroundSounds').then(m => ({ default: m.BackgroundSounds })))
const GoalsPanel = lazy(() => import('./components/GoalsPanel').then(m => ({ default: m.GoalsPanel })))
const AchievementsPanel = lazy(() => import('./components/AchievementsPanel').then(m => ({ default: m.AchievementsPanel })))
import { MotivationWidget } from './components/MotivationWidget'
import { FocusMode } from './components/FocusMode'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'
import { SessionCompletionModal } from './components/SessionCompletionModal'
import { NoTaskWarningModal } from './components/NoTaskWarningModal'
import { TaskSwitchConfirmModal } from './components/TaskSwitchConfirmModal'

import { CommandPalette } from './components/CommandPalette'
import { NotificationCenter } from './components/NotificationCenter'
import { AccountPanel } from './components/AccountPanel'
import { SessionHistory } from './components/SessionHistory'
import { ActiveFocusPanel } from './components/ActiveFocusPanel'
import { TodaySummary } from './components/TodaySummary'
import { SessionFlowViz } from './components/SessionFlowViz'
import { FocusQueue } from './components/FocusQueue'
import { TimerController } from './components/TimerController'

function Card({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -2, boxShadow: '0 10px 30px -12px rgba(0,0,0,0.35)' }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/25 ${className}`}
    >
      {children}
    </motion.div>
  )
}

function Dashboard() {
  const settings = useStore(s => s.settings)

  // Apply theme via class toggle. The pre-hydration script in app/layout.tsx
  // applies this synchronously on first paint; this useEffect keeps the class
  // in sync when the user changes the setting and listens to system changes.
  useEffect(() => {
    const apply = () => {
      const t = settings.theme
      const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.toggle('dark', isDark)
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    }
    apply()
    if (settings.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [settings.theme])

  // Toast when start is blocked because no task is selected
  useEffect(() => {
    const onNoTask = () => toast.warning('Pick a task before starting a focus session', {
      description: 'Choose or create a task to track your progress.',
      duration: 2400,
    })
    window.addEventListener('focusflow:no-task', onNoTask)
    return () => window.removeEventListener('focusflow:no-task', onNoTask)
  }, [])

  // Global keyboard shortcuts (disabled in focus mode — FocusMode handles its own)
  const isFocusMode = useStore((s) => s.isFocusMode)
  useEffect(() => {
    if (isFocusMode) return
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') return // handled by CommandPalette

      const state = useStore.getState()
      if (e.code === 'Space') {
        e.preventDefault()
        if (state.isFocusMode) return
        const running = state.isRunning
        state.requestStart()
        toast(running ? 'Timer paused' : 'Timer started', { duration: 1200 })
      }

      if (e.code === 'KeyR' && !e.metaKey && !e.ctrlKey) {
        if (state.isFocusMode) return
        state.resetTimer()
        toast('Timer reset', { duration: 1200 })
      }
      if (e.code === 'KeyN') document.dispatchEvent(new CustomEvent('open-add-task'))
      if (e.code === 'KeyF') state.setFocusMode(true)
      if (e.code === 'KeyS' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        state.setSettingsOpen(true)
      }
      if (e.code === 'KeyT' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        const current = state.settings.theme
        const next = current === 'dark' ? 'light' : 'dark'
        state.updateSettings({ theme: next })
        toast(`Switched to ${next} mode`, { duration: 1200 })
      }
      if (e.code === 'Digit1') state.setMode('pomodoro')
      if (e.code === 'Digit2') state.setMode('shortBreak')
      if (e.code === 'Digit3') state.setMode('longBreak')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 pb-16 pt-5 sm:px-6 lg:px-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
          <div className="flex flex-col gap-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 30%, rgba(249,115,22,0.10) 0%, transparent 65%)' }}
              />
              <div className="relative p-5 space-y-4">
                <PomodoroTimer />
                <div className="border-t border-border pt-3">
                  <SessionFlowViz />
                </div>
              </div>
            </div>

            <Card className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-foreground" style={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                    Currently Focusing
                  </span>
                </div>
                <span className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: '0.6rem', fontWeight: 600 }}>
                  Focus Session
                </span>
              </div>

              <ActiveFocusPanel />

              <div className="border-t border-border/70 pt-3">
                <FocusQueue />
              </div>
            </Card>
          </div>

          <div className="flex h-full min-h-0 flex-col gap-4">
            <Card id="tasks-section" className="flex min-h-0 flex-1 flex-col scroll-mt-24 transition-shadow">
              <TaskManager />
            </Card>
            <Card>
              <TodaySummary />
            </Card>
          </div>
        </div>

        <Card>
          <StatsPanel />
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Card><SessionHistory /></Card>
          <Card><Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-secondary/40" />}><AnalyticsPanel /></Suspense></Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          <Card className="flex h-full flex-col"><Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-secondary/40" />}><GoalsPanel /></Suspense></Card>
          <Card className="flex h-full flex-col"><Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-secondary/40" />}><AchievementsPanel /></Suspense></Card>
          <Card className="flex h-full flex-col"><Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-secondary/40" />}><BackgroundSounds /></Suspense></Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card><MotivationWidget /></Card>
          <Card><KeyboardShortcuts /></Card>
        </div>
      </main>

      <TimerController />
      <FocusMode />
      <SettingsDrawer />
      <SessionCompletionModal />
      <NoTaskWarningModal />
      <TaskSwitchConfirmModal />

      <CommandPalette />
      <NotificationCenter />
      <AccountPanel />
    </div>
  )
}

function AppShell() {
  const { user } = useAuthSession()

  // Start/stop cloud sync based on auth state. App is fully usable as guest.
  useEffect(() => {
    const userId = user?.id
    if (userId) {
      startSync(userId).catch(e => console.error('[sync] start failed', e))
    } else {
      stopSync()
    }
  }, [user?.id])

  return (
    <>
      <Dashboard />
      <Toaster richColors position="bottom-right" />
    </>
  )
}

export default function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <DndProvider backend={HTML5Backend}>
        <AppShell />
      </DndProvider>
    </TooltipProvider>
  )
}
