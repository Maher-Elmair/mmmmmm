import { memo } from 'react'
import Image from 'next/image'
import { Sun, Moon, Bell, Settings, Maximize2, Timer } from 'lucide-react'
import { Button } from './ui/button'
import { useStore } from '../stores/useStore'
import { Tip } from './ui/tip'
import { playUiSound } from '../lib/sounds'
import { useAuthSession } from '../hooks/useAuthSession'
import { useSyncStatus } from '../hooks/useSyncStatus'

export const Header = memo(function Header() {
  const theme = useStore(s => s.settings.theme)
  const updateSettings = useStore(s => s.updateSettings)
  const setSettingsOpen = useStore(s => s.setSettingsOpen)
  const setFocusMode = useStore(s => s.setFocusMode)
  const notifications = useStore(s => s.notifications)
  const userName = useStore(s => s.userName)
  const setNotificationCenterOpen = useStore(s => s.setNotificationCenterOpen)
  const setAccountPanelOpen = useStore(s => s.setAccountPanelOpen)
  const { user } = useAuthSession()
  const { status } = useSyncStatus()

  const unreadCount = notifications.filter(n => !n.read).length
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ||
    (user?.user_metadata?.picture as string | undefined) || null
  const initials = userName
    .split(/\s+/).filter(Boolean).slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '').join('') || 'U'

  const dotColor =
    status === 'synced' ? 'bg-green-500' :
    status === 'syncing' ? 'bg-blue-500 animate-pulse' :
    status === 'offline' ? 'bg-amber-500' :
    status === 'error' ? 'bg-red-500' : 'bg-muted-foreground/40'

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    playUiSound('modeSwitch')
    updateSettings({ theme: next })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Timer className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-foreground tracking-tight" style={{ fontWeight: 600, fontSize: '1rem' }}>
              PomodoroFlow
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Tip label="Focus Mode" hotkey="F">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFocusMode(true)}
                aria-label="Focus Mode"
                className="h-8 w-8 cursor-pointer rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </Tip>

            <Tip label="Notifications">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { playUiSound('tabSwitch'); setNotificationCenterOpen(true) }}
                aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                className="relative h-8 w-8 cursor-pointer rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-primary-foreground" style={{ fontSize: '0.55rem', fontWeight: 700 }}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </Tip>

            <Tip label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                className="h-8 w-8 cursor-pointer rounded-lg text-muted-foreground hover:text-foreground"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </Tip>

            <Tip label="Settings">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                aria-label="Settings"
                className="h-8 w-8 cursor-pointer rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Tip>

            <Tip label="Account">
              <button
                onClick={() => { playUiSound('tabSwitch'); setAccountPanelOpen(true) }}
                aria-label="Account"
                className="relative ml-1 flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-80"
                style={{ fontSize: '0.65rem', fontWeight: 700 }}
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="" width={28} height={28} unoptimized className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
                {user && (
                  <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${dotColor}`} />
                )}
              </button>
            </Tip>
          </div>
        </div>
      </div>
    </header>
  )
})
