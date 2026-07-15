import { useEffect, useState } from 'react'
import { Cloud, HardDrive, GitMerge } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button'
import { setMigrationHandler, type MigrationChoice, type MigrationPreview } from '../lib/cloud/sync'

interface PendingRequest {
  preview: MigrationPreview
  resolve: (c: MigrationChoice) => void
}

export function MigrationDialog() {
  const [pending, setPending] = useState<PendingRequest | null>(null)

  useEffect(() => {
    setMigrationHandler((preview) => new Promise<MigrationChoice>((resolve) => {
      setPending({ preview, resolve })
    }))
    return () => setMigrationHandler(null)
  }, [])

  const choose = (c: MigrationChoice) => {
    pending?.resolve(c)
    setPending(null)
  }

  const open = !!pending
  const local = pending?.preview.local
  const cloud = pending?.preview.cloud

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && pending) choose('merge') }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Saved data found on this device</DialogTitle>
          <DialogDescription>
            Choose how to combine your local data with your account.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
              <HardDrive className="h-3 w-3" /> THIS DEVICE
            </div>
            <div className="mt-2 text-foreground" style={{ fontSize: '0.8125rem' }}>
              {local?.tasks ?? 0} tasks · {local?.sessions ?? 0} sessions
            </div>
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground" style={{ fontSize: '0.7rem', fontWeight: 600 }}>
              <Cloud className="h-3 w-3" /> CLOUD
            </div>
            <div className="mt-2 text-foreground" style={{ fontSize: '0.8125rem' }}>
              {cloud?.tasks ?? 0} tasks · {cloud?.sessions ?? 0} sessions
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <Button onClick={() => choose('merge')} className="w-full justify-start gap-2 h-11">
            <GitMerge className="h-4 w-4" />
            <span className="flex-1 text-left">
              <span className="block" style={{ fontWeight: 600 }}>Merge both</span>
              <span className="block text-primary-foreground/80" style={{ fontSize: '0.7rem' }}>Combine and keep the latest of each item</span>
            </span>
          </Button>
          <Button variant="outline" onClick={() => choose('local')} className="w-full justify-start gap-2 h-11">
            <HardDrive className="h-4 w-4" />
            <span className="flex-1 text-left">
              <span className="block" style={{ fontWeight: 600 }}>Keep this device's data</span>
              <span className="block text-muted-foreground" style={{ fontSize: '0.7rem' }}>Upload local data and replace the cloud</span>
            </span>
          </Button>
          <Button variant="outline" onClick={() => choose('cloud')} className="w-full justify-start gap-2 h-11">
            <Cloud className="h-4 w-4" />
            <span className="flex-1 text-left">
              <span className="block" style={{ fontWeight: 600 }}>Use cloud data</span>
              <span className="block text-muted-foreground" style={{ fontSize: '0.7rem' }}>Replace local data with what's in your account</span>
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
