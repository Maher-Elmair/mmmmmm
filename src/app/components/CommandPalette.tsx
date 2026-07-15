import { useEffect, useCallback } from 'react'
import { useStore } from '../stores/useStore'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'
import {
  Timer, Coffee, Moon, Settings, Maximize2, Plus, Sun,
  BarChart2, Target, Zap,
} from 'lucide-react'

export function CommandPalette() {
  const {
    isCommandPaletteOpen, setCommandPaletteOpen,
    setSettingsOpen, setFocusMode, requestStart, isRunning,
    setMode, updateSettings, settings,
  } = useStore()

  // Press "K" to open (ignored when typing in inputs)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key !== 'k' && e.key !== 'K') return
      const t = e.target as HTMLElement | null
      const tag = t?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return
      e.preventDefault()
      setCommandPaletteOpen(!isCommandPaletteOpen)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isCommandPaletteOpen])

  const run = useCallback((fn: () => void) => {
    setCommandPaletteOpen(false)
    setTimeout(fn, 100)
  }, [])

  return (
    <CommandDialog open={isCommandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList className="max-h-[60vh] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 [scrollbar-width:thin] [scrollbar-color:var(--color-border)_transparent]">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Timer">
          <CommandItem onSelect={() => run(() => requestStart())}>
            <Timer className="mr-2 h-4 w-4" />
            {isRunning ? 'Pause Timer' : 'Start Timer'}
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>Space</kbd>
          </CommandItem>
          <CommandItem onSelect={() => run(() => setMode('pomodoro'))}>
            <Timer className="mr-2 h-4 w-4" />
            Switch to Focus Mode
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>1</kbd>
          </CommandItem>
          <CommandItem onSelect={() => run(() => setMode('shortBreak'))}>
            <Coffee className="mr-2 h-4 w-4" />
            Switch to Short Break
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>2</kbd>
          </CommandItem>
          <CommandItem onSelect={() => run(() => setMode('longBreak'))}>
            <Moon className="mr-2 h-4 w-4" />
            Switch to Long Break
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>3</kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Tasks">
          <CommandItem onSelect={() => run(() => document.dispatchEvent(new CustomEvent('open-add-task')))}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Task
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>N</kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => run(() => setFocusMode(true))}>
            <Maximize2 className="mr-2 h-4 w-4" />
            Enter Focus Mode
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>F</kbd>
          </CommandItem>
          <CommandItem onSelect={() => run(() => setSettingsOpen(true))}>
            <Settings className="mr-2 h-4 w-4" />
            Open Settings
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>S</kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Appearance">
          <CommandItem onSelect={() => run(() => {
            const next = settings.theme === 'dark' ? 'light' : 'dark'
            updateSettings({ theme: next })
            document.documentElement.classList.toggle('dark', next === 'dark')
          })}>
            {settings.theme === 'dark'
              ? <Sun className="mr-2 h-4 w-4" />
              : <Moon className="mr-2 h-4 w-4" />
            }
            Toggle {settings.theme === 'dark' ? 'Light' : 'Dark'} Mode
            <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground" style={{ fontSize: '0.65rem' }}>T</kbd>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
