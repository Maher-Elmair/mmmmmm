import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
import { createSupabaseFetch } from './fetch'

export interface AuthContext {
  supabase: ReturnType<typeof createClient<Database>>
  userId: string
}

/**
 * Creates a Supabase client with the service-role key for admin operations
 * (e.g. auth.admin.deleteUser). This client bypasses RLS — use only for
 * server-side operations that require elevated privileges.
 */
export function createServiceRoleClient(): ReturnType<typeof createClient<Database>> {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY

  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY for service-role client')
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  })
}

export async function requireAuth(request: Request): Promise<AuthContext> {
  const SUPABASE_URL = process.env.SUPABASE_URL
  const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing Supabase environment variables')
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const token = authHeader.slice(7)
  if (!token || token.split('.').length !== 3) {
    throw new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
      headers: { Authorization: `Bearer ${token}` },
    },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase.auth.getClaims(token)
  if (error || !data?.claims?.sub) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return { supabase, userId: data.claims.sub }
}
