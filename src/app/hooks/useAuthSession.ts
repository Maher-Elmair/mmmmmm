/**
 * Backwards-compatible facade over the Zustand auth store.
 *
 * The auth state lives in `@/app/store/auth/authStore`. This hook
 * preserves the original `{ session, user, loading }` shape so existing
 * consumers (App, Header, AccountPanel) don't need any changes.
 *
 * Lifecycle is initialized once at App mount via `useAuthStore.getState().initialize()`.
 */
import { useEffect } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { useAuth, useAuthStore } from '@/app/stores/auth/authStore'

export interface AuthState {
  session: Session | null
  user: User | null
  loading: boolean
}

export function useAuthSession(): AuthState {
  // Ensure the store is wired even if a consumer mounts before App's effect.
  useEffect(() => {
    const teardown = useAuthStore.getState().initialize()
    return () => {
      // Keep the listener alive across remounts — the store handles its own lifecycle.
      void teardown
    }
  }, [])

  return useAuth()
}
