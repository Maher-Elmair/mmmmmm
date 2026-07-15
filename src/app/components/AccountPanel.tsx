import { useState, useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Switch } from './ui/switch'
import { useStore } from '../stores/useStore'
import { useAuthSession } from '../hooks/useAuthSession'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { supabase } from '@/integrations/supabase/client'
import { stopSync, setCloudSyncEnabled, isCloudSyncEnabled } from '../lib/cloud/sync'
import { toast } from 'sonner'
import {
  Mail, HardDrive, Settings, LogOut, X, Check, Pencil,
  Loader2, CloudOff, CheckCircle2, AlertCircle, RefreshCw, Apple, User,
} from 'lucide-react'

function GoogleIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 0 1 0-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C41 35.2 44 30 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-1 text-muted-foreground uppercase tracking-widest" style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em' }}>
      {children}
    </p>
  )
}

function timeAgo(ts: number | null): string {
  if (!ts) return 'never'
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 5) return 'just now'
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function AccountPanel() {
  const isAccountPanelOpen = useStore(s => s.isAccountPanelOpen)
  const setAccountPanelOpen = useStore(s => s.setAccountPanelOpen)
  const setSettingsOpen = useStore(s => s.setSettingsOpen)
  const userName = useStore(s => s.userName)
  const setUserName = useStore(s => s.setUserName)
  const { user, loading } = useAuthSession()
  const { status, lastSyncedAt } = useSyncStatus()

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(userName)
  const [signingOut, setSigningOut] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<null | 'google' | 'apple'>(null)
  const [syncEnabled, setSyncEnabled] = useState<boolean>(() => isCloudSyncEnabled())


  const handleOAuth = async (provider: 'google' | 'apple') => {
    setOauthLoading(provider)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      })
      if (error) {
        toast.error('Sign-in failed', { description: error.message })
        setOauthLoading(null)
        return
      }
      if (data?.url) window.location.href = data.url
    } catch (e) {
      toast.error('Sign-in failed', { description: e instanceof Error ? e.message : String(e) })
      setOauthLoading(null)
    }
  }

  useEffect(() => {
    if (user) {
      const metaName =
        (user.user_metadata?.full_name as string | undefined) ||
        (user.user_metadata?.name as string | undefined)
      if (metaName && metaName !== userName) setUserName(metaName)
    }
  }, [user, userName, setUserName])

  const displayEmail = user?.email ?? 'Local account'
  const provider = (user?.app_metadata?.provider as string | undefined) ?? 'email'
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ||
    (user?.user_metadata?.picture as string | undefined) || null

  const initials = userName
    .split(/\s+/).filter(Boolean).slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '').join('') || 'U'

  const saveName = () => {
    const trimmed = draft.trim()
    if (trimmed) setUserName(trimmed)
    else setDraft(userName)
    setEditing(false)
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      stopSync()
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Signed out')
      setAccountPanelOpen(false)
    } catch (err) {
      toast.error('Sign-out failed', { description: err instanceof Error ? err.message : String(err) })
    } finally {
      setSigningOut(false)
    }
  }

  const handleSyncToggle = async (next: boolean) => {
    setSyncEnabled(next)
    try {
      await setCloudSyncEnabled(next, user?.id ?? null)
      toast.success(next ? 'Cloud Sync enabled' : 'Cloud Sync disabled — data stays on this device')
    } catch (err) {
      setSyncEnabled(!next)
      toast.error('Could not change sync setting', { description: err instanceof Error ? err.message : String(err) })
    }
  }


  // Sync badge presentation
  const syncBadge = (() => {
    switch (status) {
      case 'syncing': return { icon: Loader2, text: 'Syncing…', tone: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10', spin: true }
      case 'synced': return { icon: CheckCircle2, text: `Synced · ${timeAgo(lastSyncedAt)}`, tone: 'text-green-500 dark:text-green-400', bg: 'bg-green-500/10' }
      case 'offline': return { icon: CloudOff, text: 'Offline · changes saved locally', tone: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' }
      case 'error': return { icon: AlertCircle, text: 'Sync failed · will retry', tone: 'text-red-500 dark:text-red-400', bg: 'bg-red-500/10' }
      case 'disabled': return { icon: CloudOff, text: 'Cloud Sync disabled', tone: 'text-muted-foreground', bg: 'bg-secondary' }
      default: return { icon: RefreshCw, text: user ? 'Idle' : 'Sign in to sync across devices', tone: 'text-muted-foreground', bg: 'bg-secondary' }
    }
  })()

  const providerLabel = provider.charAt(0).toUpperCase() + provider.slice(1)

  return (
    <Sheet open={isAccountPanelOpen} onOpenChange={setAccountPanelOpen}>
      <SheetContent
        className="flex flex-col gap-0 p-0 w-full sm:max-w-[380px] [&>button.absolute]:hidden"
        side="right"
        style={{ height: '100dvh' }}
      >
        <SheetTitle className="sr-only">Account</SheetTitle>
        <SheetDescription className="sr-only">Manage your account, profile, and sign-in options.</SheetDescription>
        {/* Header */}
        <div className="shrink-0 border-b border-border">
          <div
            className="relative h-24"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.35) 0%, rgba(168,85,247,0.20) 60%, rgba(59,130,246,0.18) 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.10) 0%, transparent 35%)' }}
            />
            <button
              aria-label="Close account panel"
              onClick={() => setAccountPanelOpen(false)}
              className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background/60 text-foreground/70 backdrop-blur-md transition-all hover:scale-105 hover:bg-background/80 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="px-5 pb-5 -mt-10">
            {avatarUrl ? (
              <Image src={avatarUrl} alt={userName} width={80} height={80} unoptimized className="h-20 w-20 rounded-2xl border-4 border-background object-cover shadow-lg" />
            ) : (
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-gradient-to-br from-primary to-orange-600 text-white shadow-lg"
                style={{ fontWeight: 700, fontSize: '1.5rem' }}
              >
                {initials}
              </div>
            )}
            <div className="mt-3">
              {editing ? (
                <div className="flex items-center gap-1.5">
                  <Input
                    key={userName}
                    autoFocus
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') saveName()
                      if (e.key === 'Escape') { setDraft(userName); setEditing(false) }
                    }}
                    className="h-8"
                    style={{ fontSize: '1rem', fontWeight: 600 }}
                    maxLength={40}
                  />
                  <Button size="icon" variant="default" className="h-8 w-8 shrink-0 cursor-pointer" onClick={saveName}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="group inline-flex cursor-pointer items-center gap-1.5 rounded-md px-1 -mx-1 text-left transition-colors hover:bg-secondary/60"
                >
                  <h2 className="text-foreground" style={{ fontWeight: 700, fontSize: '1.125rem' }}>{userName}</h2>
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              )}
              <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                <Mail className="h-3 w-3" />
                {displayEmail}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-4 py-5 space-y-5">

            {/* Account status */}
            <div className="space-y-2">
              <SectionLabel>Account</SectionLabel>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${user ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                  {user
                    ? <CheckCircle2 className="h-[1.1rem] w-[1.1rem] text-green-500 dark:text-green-400" />
                    : <User className="h-[1.1rem] w-[1.1rem] text-amber-500 dark:text-amber-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {loading ? 'Loading…' : user ? 'Signed in' : 'Status: Guest Mode'}
                  </p>
                  <p className="text-muted-foreground truncate" style={{ fontSize: '0.72rem' }}>
                    {user ? `via ${providerLabel}` : 'Running locally on this device — no account needed'}
                  </p>
                </div>
              </div>

              {!user && !loading && (
                <div className="space-y-2 pt-1">
                  <Button variant="outline" className="w-full h-10 gap-2 cursor-pointer" onClick={() => handleOAuth('google')} disabled={!!oauthLoading}>
                    {oauthLoading === 'google' ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
                    <span style={{ fontSize: '0.8125rem' }}>Continue with Google</span>
                  </Button>
                  <Button variant="outline" className="w-full h-10 gap-2 cursor-pointer" onClick={() => handleOAuth('apple')} disabled={!!oauthLoading}>
                    {oauthLoading === 'apple' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Apple className="h-4 w-4" />}
                    <span style={{ fontSize: '0.8125rem' }}>Continue with Apple</span>
                  </Button>
                  <p className="px-1 text-muted-foreground" style={{ fontSize: '0.7rem' }}>
                    Sign in only if you want to sync between devices. Your local data stays safe.
                  </p>
                </div>
              )}
            </div>

            {/* Data & Storage */}
            <div className="space-y-2">
              <SectionLabel>Data & Storage</SectionLabel>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                  <HardDrive className="h-[1.1rem] w-[1.1rem] text-green-500 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Local Storage Active</p>
                  <p className="text-muted-foreground" style={{ fontSize: '0.72rem' }}>Saved on this device</p>
                </div>
              </div>

              <div className={`flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 ${user ? '' : 'opacity-60'}`}>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${syncBadge.bg}`}>
                  <syncBadge.icon className={`h-[1.1rem] w-[1.1rem] ${syncBadge.tone} ${syncBadge.spin ? 'animate-spin' : ''}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Cloud Sync</p>
                  <p className="text-muted-foreground truncate" style={{ fontSize: '0.72rem' }}>
                    {user ? syncBadge.text : 'Sign in to sync across devices'}
                  </p>
                </div>
                {user && (
                  <Switch
                    checked={syncEnabled}
                    onCheckedChange={handleSyncToggle}
                    aria-label="Toggle Cloud Sync"
                  />
                )}
              </div>
            </div>


            {/* Footer actions */}
            <div className="space-y-1 pt-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2.5 cursor-pointer text-foreground hover:bg-secondary h-10"
                onClick={() => { setAccountPanelOpen(false); setSettingsOpen(true) }}
              >
                <Settings className="h-4 w-4" />
                <span style={{ fontSize: '0.875rem' }}>Settings</span>
              </Button>
              {user && (
                <>
                  <Separator className="my-1" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2.5 cursor-pointer h-10 text-red-600 hover:bg-red-500/10 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400"
                    disabled={signingOut}
                    onClick={handleSignOut}
                  >
                    {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    <span style={{ fontSize: '0.875rem' }}>Sign Out</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </ScrollArea>


      </SheetContent>
    </Sheet>
  )
}
