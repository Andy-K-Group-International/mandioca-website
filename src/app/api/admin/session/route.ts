import { NextResponse } from 'next/server'
import { getCombinedAuthSession } from '@/lib/supabase-auth'

export async function GET() {
  try {
    const auth = await getCombinedAuthSession()

    return NextResponse.json({
      authenticated: auth.authenticated,
      authType: auth.authType,
      role: auth.role,
      userId: auth.user?.staffUser?.id || null,
      userName: auth.user?.staffUser?.name || null,
      isAdmin: auth.isAdmin,
      isVolunteer: auth.isVolunteer,
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false })
  }
}
