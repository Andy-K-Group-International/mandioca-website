'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/lib/i18n'
import { Loader2, Lock, User, Eye, EyeOff } from 'lucide-react'

const REMEMBER_KEY = 'admin_remember'

export default function AdminLoginPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY)
      if (saved) {
        const { username: u, password: p } = JSON.parse(saved)
        setUsername(u || '')
        setPassword(p || '')
        setRememberMe(true)
      }
    } catch {
      // ignore corrupted data
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t.admin.login.error.default)
        return
      }

      // Save or clear remembered credentials
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, JSON.stringify({ username, password }))
      } else {
        localStorage.removeItem(REMEMBER_KEY)
      }

      // Hard redirect to admin dashboard to ensure fresh server render
      window.location.href = '/admin'
    } catch {
      setError(t.admin.login.error.connection)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A4843] to-[#0d5c55] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0A4843] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t.admin.login.title}</h1>
            <p className="text-gray-500 mt-2">{t.admin.login.subtitle}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">{t.admin.login.username}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder={t.admin.login.usernamePlaceholder}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.admin.login.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t.admin.login.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked)
                  if (!e.target.checked) {
                    localStorage.removeItem(REMEMBER_KEY)
                  }
                }}
                className="h-4 w-4 rounded border-gray-300 text-[#0A4843] focus:ring-[#0A4843] cursor-pointer"
                disabled={loading}
              />
              <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                {t.admin.login.rememberMe}
              </Label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#0A4843] hover:bg-[#0d5c55] text-white py-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t.admin.login.submitting}
                </>
              ) : (
                t.admin.login.submit
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-gray-500 hover:text-[#0A4843] transition-colors"
            >
              &larr; {t.admin.login.backToSite}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
