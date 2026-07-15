import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

/**
 * Auth Store (Zustand)
 *
 * Single source of truth for authentication state. Wraps Supabase auth
 * so the rest of the app never imports `supabase.auth.*` directly for
 * session reads. The Supabase client still owns token persistence
 * (localStorage via its own storage adapter) — we do NOT re-persist the
 * session here to avoid double-storage drift.
 *
 * Lifecycle: `initialize()` must be called exactly once at app mount.
 * It registers the `onAuthStateChange` listener FIRST, then hydrates
 * the current session, matching Supabase's recommended order to avoid
 * missed events.
 */

export interface AuthStoreState {
  session: Session | null
  user: User | null
  loading: boolean
  initialized: boolean
  error: string | null
}

export interface AuthStoreActions {
  /** Register listener + hydrate session. Idempotent. */
  initialize: () => () => void
  /** Refresh the current session from Supabase. */
  refresh: () => Promise<void>
  /** Sign the current user out and clear local state. */
  signOut: () => Promise<void>
  /** Internal: applied by the auth listener. */
  _setSession: (session: Session | null) => void
}

export type AuthStore = AuthStoreState & AuthStoreActions

const initialState: AuthStoreState = {
  session: null,
  user: null,
  loading: true,
  initialized: false,
  error: null,
}

let unsubscribe: (() => void) | null = null

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      _setSession: (session) =>
        set(
          {
            session,
            user: session?.user ?? null,
            loading: false,
            error: null,
          },
          false,
          'auth/setSession',
        ),

      initialize: () => {
        // Idempotent — return the existing teardown if already wired.
        if (get().initialized && unsubscribe) return unsubscribe

        set({ initialized: true }, false, 'auth/initialize')

        // Register listener FIRST so we don't miss SIGNED_IN events
        // that fire before getSession() resolves.
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          get()._setSession(session)
        })

        // Then hydrate current session.
        supabase.auth
          .getSession()
          .then(({ data: { session } }) => {
            get()._setSession(session)
          })
          .catch((err: unknown) => {
            set(
              {
                loading: false,
                error: err instanceof Error ? err.message : 'Failed to load session',
              },
              false,
              'auth/initializeError',
            )
          })

        unsubscribe = () => {
          data.subscription.unsubscribe()
          unsubscribe = null
        }
        return unsubscribe
      },

      refresh: async () => {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          set({ error: error.message }, false, 'auth/refreshError')
          return
        }
        get()._setSession(data.session)
      },

      signOut: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          set({ error: error.message }, false, 'auth/signOutError')
          return
        }
        set(
          { session: null, user: null, error: null, loading: false },
          false,
          'auth/signOut',
        )
      },
    }),
    { name: 'auth-store', enabled: process.env.NODE_ENV === 'development' },
  ),
)

// ──────────────────────────── Selectors ────────────────────────────
// Stable selectors prevent unnecessary re-renders by subscribing to
// the smallest possible slice of state.

export const selectUser = (s: AuthStore) => s.user
export const selectSession = (s: AuthStore) => s.session
export const selectAuthLoading = (s: AuthStore) => s.loading
export const selectIsAuthenticated = (s: AuthStore) => s.user !== null

/**
 * Convenience hook returning the public auth shape `{ user, session, loading }`.
 * Uses `useShallow` so consumers don't re-render unless one of these three
 * fields actually changes.
 */
export const useAuth = () =>
  useAuthStore(
    useShallow((s) => ({
      user: s.user,
      session: s.session,
      loading: s.loading,
    })),
  )
