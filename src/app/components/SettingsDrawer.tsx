import { useState, type ComponentType, type ReactNode } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from './ui/alert-dialog'
import { useStore } from '../stores/useStore'
import {
  Timer, Zap, Bell, Palette, Volume2, Globe,
  Sun, Moon, Monitor, AlertTriangle, RotateCcw,
} from 'lucide-react'

import { playUiSound } from '../lib/sounds'


// ─── Building blocks ──────────────────────────────────────────────────────────

function Section({ children }: { children: ReactNode }) {
  return <div className="space-y-1">{children}</div>
}

function SectionLabel({ icon: Icon, title }: { icon: ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-1 pt-3">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {title}
      </span>
    </div>
  )
}

/** A row with label + optional description on the left, control on the right */
function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg px-1 py-2.5">
      <div className="flex-1 min-w-0">
        <p className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</p>
        {description && (
          <p className="mt-0.5 text-muted-foreground" style={{ fontSize: '0.75rem' }}>{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

/** Full-width slider row — value prominent, slider spans the full card */
function SliderRow({
  label,
  value,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  unit: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div className="rounded-lg bg-secondary/60 px-3 py-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
        <div className="flex items-center gap-1">
          <span className="tabular-nums text-primary" style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '1rem', fontWeight: 600 }}>
            {value}
          </span>
          <span className="text-muted-foreground" style={{ fontSize: '0.78rem' }}>{unit}</span>
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
      <div className="flex justify-between text-muted-foreground" style={{ fontSize: '0.68rem' }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function SettingsDrawer() {
  const isSettingsOpen = useStore(s => s.isSettingsOpen)
  const setSettingsOpen = useStore(s => s.setSettingsOpen)
  const settings = useStore(s => s.settings)
  const updateSettings = useStore(s => s.updateSettings)
  const [resetOpen, setResetOpen] = useState(false)

  const applyTheme = (t: 'dark' | 'light' | 'system') => {
    playUiSound('click')
    updateSettings({ theme: t })
    if (t === 'dark') document.documentElement.classList.add('dark')
    else if (t === 'light') document.documentElement.classList.remove('dark')
    else document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  }

  const confirmReset = () => {
    updateSettings({
      pomodoroDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      autoStartBreaks: false,
      autoStartSessions: false,
      notificationsEnabled: true,
      soundEnabled: true,
      uiSoundsEnabled: true,
      hoverSoundsEnabled: false,
      requireTaskForSession: true,
      theme: 'dark',
      dailyGoal: 8,
    })
    applyTheme('dark')
    setResetOpen(false)
  }

  return (
    <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-[420px] overflow-hidden p-0"
      >

        {/* Header */}
        <SheetHeader className="border-b border-border px-5 py-4 shrink-0">
          <SheetTitle style={{ fontSize: '1rem', fontWeight: 600 }}>Settings</SheetTitle>
          <SheetDescription className="text-muted-foreground" style={{ fontSize: '0.78rem' }}>
            Customize your Pomodoro experience
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">

          {/* ── Timer Durations ─────────────────────────── */}
          <Section>
            <SectionLabel icon={Timer} title="Timer Durations" />
            <div className="space-y-2.5">
              <SliderRow
                label="Focus session"
                value={settings.pomodoroDuration}
                unit=" min"
                min={5}
                max={90}
                step={5}
                onChange={v => updateSettings({ pomodoroDuration: v })}
              />
              <SliderRow
                label="Short break"
                value={settings.shortBreakDuration}
                unit=" min"
                min={1}
                max={30}
                step={1}
                onChange={v => updateSettings({ shortBreakDuration: v })}
              />
              <SliderRow
                label="Long break"
                value={settings.longBreakDuration}
                unit=" min"
                min={5}
                max={60}
                step={5}
                onChange={v => updateSettings({ longBreakDuration: v })}
              />
              <SliderRow
                label="Daily goal"
                value={settings.dailyGoal}
                unit=" sessions"
                min={1}
                max={24}
                step={1}
                onChange={v => updateSettings({ dailyGoal: v })}
              />
            </div>
          </Section>

          <Separator className="my-4 opacity-50" />

          {/* ── Automation ─────────────────────────────── */}
          <Section>
            <SectionLabel icon={Zap} title="Automation" />
            <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
              <SettingRow
                label="Auto-start breaks"
                description="Begin break countdown automatically"
              >
                <Switch
                  checked={settings.autoStartBreaks}
                  onCheckedChange={v => { playUiSound('toggle'); updateSettings({ autoStartBreaks: v }) }}
                />
              </SettingRow>
              <SettingRow
                label="Auto-start sessions"
                description="Resume focus after break ends"
              >
                <Switch
                  checked={settings.autoStartSessions}
                  onCheckedChange={v => { playUiSound('toggle'); updateSettings({ autoStartSessions: v }) }}
                />
              </SettingRow>
              <SettingRow
                label="Require active task"
                description="Ask to pick a task before starting a focus session"
              >
                <Switch
                  checked={settings.requireTaskForSession}
                  onCheckedChange={v => { playUiSound('toggle'); updateSettings({ requireTaskForSession: v }) }}
                />
              </SettingRow>
            </div>
          </Section>

          <Separator className="my-4 opacity-50" />

          {/* ── Notifications & Sound ──────────────────── */}
          <Section>
            <SectionLabel icon={Bell} title="Notifications & Sound" />
            <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
              <SettingRow
                label="Browser notifications"
                description="Alerts when sessions complete"
              >
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={v => {
                    playUiSound('toggle')
                    if (v && 'Notification' in window) Notification.requestPermission()
                    updateSettings({ notificationsEnabled: v })
                  }}
                />
              </SettingRow>
              <SettingRow
                label="Sound alerts"
                description="Audio tone on session complete"
              >
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={v => { playUiSound('toggle'); updateSettings({ soundEnabled: v }) }}
                />
              </SettingRow>
              <SettingRow
                label="UI sounds"
                description="Subtle tones for actions (start, tasks, mode, focus, etc.)"
              >
                <Switch
                  checked={settings.uiSoundsEnabled}
                  onCheckedChange={v => { playUiSound('toggle'); updateSettings({ uiSoundsEnabled: v }) }}
                />
              </SettingRow>
              <SettingRow
                label="Hover sounds"
                description="Soft tick when hovering interactive items"
              >
                <Switch
                  checked={settings.hoverSoundsEnabled}
                  onCheckedChange={v => { playUiSound('toggle'); updateSettings({ hoverSoundsEnabled: v }) }}
                  disabled={!settings.uiSoundsEnabled}
                />
              </SettingRow>
            </div>
            {typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'denied' && (
              <p className="mt-2 flex items-center gap-1.5 rounded-lg border border-yellow-500/20 bg-yellow-500/8 px-3 py-2 text-yellow-400" style={{ fontSize: '0.75rem' }}>
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                Notifications blocked — allow them in browser settings
              </p>
            )}
          </Section>

          <Separator className="my-4 opacity-50" />

          {/* ── Appearance ─────────────────────────────── */}
          <Section>
            <div className="rounded-2xl border border-border/60 bg-secondary/20 p-5">
              <SectionLabel icon={Palette} title="Appearance" />
              <div className="grid grid-cols-3 gap-3 mt-1">
                {([
                  { key: 'dark', icon: Moon, label: 'Dark' },
                  { key: 'light', icon: Sun, label: 'Light' },
                  { key: 'system', icon: Monitor, label: 'System' },
                ] as const).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => applyTheme(key)}
                    className={`flex flex-col items-center gap-2 rounded-xl border py-4 transition-all ${
                      settings.theme === key
                        ? 'border-primary/40 bg-primary/8 text-primary'
                        : 'border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-border/80'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" style={{ width: '1.1rem', height: '1.1rem' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>{label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3.5 py-3">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-foreground flex-1" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Language</span>
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>English</span>
                </div>
                <div
                  aria-disabled="true"
                  className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-secondary/20 px-3.5 py-3 opacity-60 cursor-not-allowed select-none"
                >
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-foreground flex-1" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>العربية</span>
                  <span
                    className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary uppercase tracking-wide"
                    style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em' }}
                  >
                    Soon
                  </span>
                </div>
              </div>
            </div>
          </Section>


          <Separator className="my-4 opacity-50" />

          {/* ── Danger Zone ────────────────────────────── */}
          <Section>
            <SectionLabel icon={AlertTriangle} title="Danger Zone" />
            <div className="rounded-xl border border-destructive/15 bg-destructive/3 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Reset settings</p>
                  <p className="text-muted-foreground mt-0.5" style={{ fontSize: '0.75rem' }}>
                    Restore all defaults — data is kept
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-destructive/25 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40"
                  onClick={() => setResetOpen(true)}
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
            </div>
          </Section>
        </div>
      </SheetContent>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset all settings?</AlertDialogTitle>
            <AlertDialogDescription>
              This restores timer durations, automation, notifications, sound, theme, and your daily goal to defaults. Your tasks and history are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reset settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>

  )
}
