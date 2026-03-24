'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { hasMockAuthSession } from '@/lib/auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const onLoginRoute = pathname === '/login'
  const isAuthenticated = mounted ? hasMockAuthSession() : false

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated && !onLoginRoute) {
      router.replace('/login')
      return
    }

    if (isAuthenticated && onLoginRoute) {
      router.replace('/')
    }
  }, [isAuthenticated, mounted, onLoginRoute, router])

  if (!mounted) return null
  if (!isAuthenticated && !onLoginRoute) return null
  if (isAuthenticated && onLoginRoute) return null

  return <>{children}</>
}
