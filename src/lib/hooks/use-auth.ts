'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import type { StaffRole } from '@/types/database'

interface AuthState {
  authenticated: boolean
  loading: boolean
  authType: 'supabase' | 'legacy' | null
  role: StaffRole | null
  userId: string | null
  userName: string | null
  isAdmin: boolean
  isVolunteer: boolean
}

const defaultState: AuthState = {
  authenticated: false,
  loading: true,
  authType: null,
  role: null,
  userId: null,
  userName: null,
  isAdmin: false,
  isVolunteer: false,
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(defaultState)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/session')
        const data = await res.json()

        if (data.authenticated) {
          setState({
            authenticated: true,
            loading: false,
            authType: data.authType || 'legacy',
            role: data.role || 'admin',
            userId: data.userId || null,
            userName: data.userName || null,
            isAdmin: data.role === 'admin' || data.authType === 'legacy',
            isVolunteer: data.role === 'volunteer',
          })
        } else {
          setState({ ...defaultState, loading: false })
        }
      } catch {
        setState({ ...defaultState, loading: false })
      }
    }

    checkAuth()
  }, [])

  return state
}
