import { useEffect, useState } from 'react'
import {
  subscribeSyncStatus,
  getSyncStatus,
  type SyncStateSnapshot,
  type SyncStatus,
} from '../lib/cloud/sync'

export type { SyncStatus }

export function useSyncStatus(): SyncStateSnapshot {
  const [s, setS] = useState<SyncStateSnapshot>(getSyncStatus())
  useEffect(() => subscribeSyncStatus(setS), [])
  return s
}
