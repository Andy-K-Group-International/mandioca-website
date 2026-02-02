import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase'
import { getCombinedAuthSession } from '@/lib/supabase-auth'
import type { StaffRole, Database } from '@/types/database'

type StaffUsersInsert = Database['public']['Tables']['staff_users']['Insert']

// GET - List all staff users
export async function GET() {
  try {
    const auth = await getCombinedAuthSession()

    if (!auth.authenticated || !auth.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: users, error } = await (supabase as any)
      .from('staff_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create/invite a new staff user
export async function POST(request: NextRequest) {
  try {
    const auth = await getCombinedAuthSession()

    if (!auth.authenticated || !auth.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, name, role = 'volunteer', sendInvite = true } = body as {
      email: string
      name: string
      role?: StaffRole
      sendInvite?: boolean
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Check if user already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingUser } = await (supabase as any)
      .from('staff_users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create the staff user record
    const staffUser: StaffUsersInsert = {
      email,
      name,
      role,
      invited_at: new Date().toISOString(),
    }

    // If current user is from Supabase auth, set invited_by
    if (auth.user?.staffUser?.id) {
      staffUser.invited_by = auth.user.staffUser.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: newUser, error: insertError } = await (supabase as any)
      .from('staff_users')
      .insert(staffUser)
      .select()
      .single()

    if (insertError) {
      console.error('Error creating user:', insertError)
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // If sendInvite is true, send magic link or invite email
    if (sendInvite) {
      const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/login`,
        data: {
          name,
          role,
        },
      })

      if (inviteError) {
        console.error('Error sending invite:', inviteError)
        // User was created but invite failed - still return success
        return NextResponse.json({
          user: newUser,
          warning: 'User created but invite email failed to send',
        })
      }
    }

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
