import { NextResponse } from 'next/server'
import { requireAuth } from '@/integrations/supabase/auth-helpers'

export async function POST(request: Request) {
  try {
    const { supabase, userId } = await requireAuth(request)

    // Best-effort wipe of app data first (cascades from auth.users handle most child rows)
    await supabase.from('profiles').delete().eq('id', userId)

    const { error } = await supabase.auth.admin.deleteUser(userId)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    if (e instanceof Response) return e
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
