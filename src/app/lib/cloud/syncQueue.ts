// ─────────────────────────────────────────────────────────────────────────────
// Local Sync Queue
//
// Persists pending mutations to localStorage so they survive reloads and can
// be flushed once the network/auth is available. One queue per signed-in
// user; guest sessions share the "guest" bucket but are never flushed.
// ─────────────────────────────────────────────────────────────────────────────

export type SyncOpType = 'create' | 'update' | 'delete'
export type SyncEntity =
  | 'task'
  | 'session'
  | 'cycle'
  | 'notification'
  | 'setting'
  | 'profile'

export interface SyncOp<P = unknown> {
  id: string                  // op id (uuid-ish, only meaningful locally)
  entity: SyncEntity
  type: SyncOpType
  entityId: string            // row id in the target table
  payload: P                  // partial row for create/update; ignored for delete
  clientUpdatedAt: string     // ISO — used for LWW
  retries: number
  lastError?: string
}

const STORAGE_PREFIX = 'focusflow:syncQueue:'

function key(userId: string) {
  return `${STORAGE_PREFIX}${userId}`
}

function safeParse(raw: string | null): SyncOp[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as SyncOp[]) : []
  } catch {
    return []
  }
}

export function readQueue(userId: string): SyncOp[] {
  if (typeof window === 'undefined') return []
  return safeParse(window.localStorage.getItem(key(userId)))
}

export function writeQueue(userId: string, ops: SyncOp[]): void {
  if (typeof window === 'undefined') return
  if (ops.length === 0) window.localStorage.removeItem(key(userId))
  else window.localStorage.setItem(key(userId), JSON.stringify(ops))
}

export function enqueue(userId: string, op: Omit<SyncOp, 'id' | 'retries'>): void {
  const ops = readQueue(userId)
  // Coalesce: if a pending op for the same entityId+entity exists and the
  // incoming op is an update, merge payloads (LWW client side) instead of
  // appending a second op. For create→update, keep create with merged payload.
  // For *→delete, drop earlier ops for the same entityId and enqueue delete.
  if (op.type === 'delete') {
    const filtered = ops.filter(
      (o) => !(o.entity === op.entity && o.entityId === op.entityId),
    )
    // If the only thing in the queue was a create that never reached the
    // server, we can simply drop it — nothing to delete remotely.
    const hadOnlyCreate =
      ops.length !== filtered.length &&
      ops.every(
        (o) =>
          !(o.entity === op.entity && o.entityId === op.entityId) ||
          o.type === 'create',
      )
    if (hadOnlyCreate) {
      writeQueue(userId, filtered)
      return
    }
    filtered.push({ ...op, id: makeOpId(), retries: 0 })
    writeQueue(userId, filtered)
    return
  }

  const existingIdx = ops.findIndex(
    (o) =>
      o.entity === op.entity &&
      o.entityId === op.entityId &&
      (o.type === 'create' || o.type === 'update') &&
      !o.lastError,
  )
  if (existingIdx >= 0) {
    const existing = ops[existingIdx]
    ops[existingIdx] = {
      ...existing,
      type: existing.type === 'create' ? 'create' : op.type,
      payload: { ...(existing.payload as object), ...(op.payload as object) },
      clientUpdatedAt: op.clientUpdatedAt,
    }
    writeQueue(userId, ops)
    return
  }

  ops.push({ ...op, id: makeOpId(), retries: 0 })
  writeQueue(userId, ops)
}

export function removeOp(userId: string, opId: string): void {
  writeQueue(
    userId,
    readQueue(userId).filter((o) => o.id !== opId),
  )
}

export function markOpError(userId: string, opId: string, error: string): void {
  const ops = readQueue(userId)
  const idx = ops.findIndex((o) => o.id === opId)
  if (idx < 0) return
  ops[idx] = { ...ops[idx], retries: ops[idx].retries + 1, lastError: error }
  writeQueue(userId, ops)
}

export function queueSize(userId: string): number {
  return readQueue(userId).length
}

function makeOpId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `op-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
