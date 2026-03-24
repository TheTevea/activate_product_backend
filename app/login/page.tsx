'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setMockAuthSession } from '@/lib/auth'
import { LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMockAuthSession()
    router.replace('/')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,88,12,0.22),transparent_40%),radial-gradient(circle_at_80%_100%,_rgba(234,88,12,0.12),transparent_35%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-8 px-4 py-10 md:px-8 lg:grid lg:grid-cols-2 lg:gap-12">
        <section className="hidden lg:flex flex-col justify-center">
          <p className="text-orange-400 text-xs tracking-[0.22em] font-semibold mb-4">ADMIN PORTAL</p>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Telegram Subscription
            <br />
            Dashboard
          </h1>
          <p className="mt-4 max-w-md text-neutral-400">
            Manage users, orders, products, and operations with a clean and secure admin experience.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-neutral-300">Role-based access and protected sessions</span>
            </div>
            <div className="flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-900/60 px-4 py-3">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-neutral-300">Operational analytics and realtime oversight</span>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <Card className="w-full max-w-md border-neutral-700 bg-neutral-900/90 backdrop-blur">
            <CardHeader className="space-y-2">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-orange-500/15 text-orange-400">
                <LockKeyhole className="h-4 w-4" />
              </div>
              <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
              <CardDescription className="text-neutral-400">
                Sign in to continue to your dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="border-neutral-700 bg-neutral-950/70 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-neutral-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-neutral-700 bg-neutral-950/70 text-white placeholder:text-neutral-500 focus-visible:ring-orange-500"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
