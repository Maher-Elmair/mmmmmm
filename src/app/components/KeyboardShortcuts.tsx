import { Keyboard, Play, RotateCcw, Plus, Maximize2, Timer, Command } from 'lucide-react'
import { type ComponentType } from 'react'

interface Shortcut {
  keys: string[]
  action: string
  icon: ComponentType<{ className?: string }>
  combo?: boolean
}

// NOTE: `S` (Open settings) and `T` (Toggle theme) remain registered in
// App.tsx and continue to work — they're intentionally hidden from this
// user-facing list per product spec.
const SHORTCUTS: Shortcut[] = [
  { keys: ['Space'],        action: 'Start / Pause',   icon: Play },
  { keys: ['R'],            action: 'Reset timer',     icon: RotateCcw },
  { keys: ['N'],            action: 'New task',        icon: Plus },
  { keys: ['F'],            action: 'Focus mode',      icon: Maximize2 },
  { keys: ['1', '2', '3'],  action: 'Switch mode',     icon: Timer },
  { keys: ['K'],            action: 'Command palette', icon: Command },
]

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-border bg-secondary px-1.5 text-foreground shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.18)]"
      style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: '0.7rem', fontWeight: 600 }}
    >
      {children}
    </kbd>
  )
}

export function KeyboardShortcuts() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Keyboard className="h-3.5 w-3.5 text-primary" />
        </div>
        <h3 className="text-foreground" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
          Keyboard Shortcuts
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {SHORTCUTS.map(({ keys, action, icon: Icon, combo }) => (
          <div
            key={action}
            className="group flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 transition-colors hover:border-primary/30 hover:bg-secondary/60"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="truncate text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                {action}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {keys.map((k, i) => (
                <span key={k} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-muted-foreground/50" style={{ fontSize: '0.65rem' }}>
                      {combo ? '+' : '/'}
                    </span>
                  )}
                  <Kbd>{k}</Kbd>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
