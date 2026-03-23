'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, Monitor, Settings, Users, Package, ShoppingCart, CreditCard, Zap, BarChart3, Bell, RefreshCw, LogOut, Tag, Key, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockCurrentUser } from '@/lib/auth'
import { TabsBar } from './tabs-bar'
import { KeyboardShortcuts } from './keyboard-shortcuts'
import { ThemeToggle } from './theme-toggle'
import { useTabOpener } from '@/hooks/use-tab-opener'

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
}

export function DashboardLayout({ children, currentPage }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentDateTime, setCurrentDateTime] = useState('')
  const { openTab } = useTabOpener()

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString())
  }, [])

  const menuItems = [
    { id: 'dashboard', icon: Monitor, label: 'Dashboard', href: '/' },
    { id: 'users', icon: Users, label: 'Users', href: '/users' },
    { id: 'products', icon: Package, label: 'Products', href: '/products' },
    { id: 'license-tokens', icon: Key, label: 'License Tokens', href: '/license-tokens' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { id: 'payments', icon: CreditCard, label: 'Payments', href: '/payments' },
    { id: 'coupons', icon: Tag, label: 'Coupons', href: '/coupons' },
    { id: 'activation-logs', icon: ScrollText, label: 'Activation Logs', href: '/activation-logs' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { id: 'reports', icon: BarChart3, label: 'Reports', href: '/reports' },
    { id: 'feedback', icon: Bell, label: 'Feedback', href: '/feedback' },
    { id: 'logs', icon: Settings, label: 'Logs', href: '/logs' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-neutral-900 border-r border-neutral-700 transition-all duration-300 fixed md:relative z-50 md:z-auto h-full flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-700">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <h1 className="text-orange-500 font-bold text-sm tracking-wider">ADMIN PORTAL</h1>
              <p className="text-neutral-500 text-xs">Subscription Manager</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-neutral-400 hover:text-orange-500"
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`}
              />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => openTab(item.label, item.href, 'module')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors text-sm ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium text-left">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className={`border-t border-neutral-700 p-4 ${sidebarCollapsed ? 'text-center' : ''}`}>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={mockCurrentUser.avatar} />
              <AvatarFallback className="bg-orange-500 text-white font-bold">{mockCurrentUser.name[0]}</AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{mockCurrentUser.name}</p>
                <p className="text-xs text-neutral-500 truncate capitalize">{mockCurrentUser.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-400">
              ADMIN DASHBOARD / <span className="text-orange-500 capitalize">{currentPage}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-neutral-500 hidden md:block">{currentDateTime}</div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs Bar */}
        <TabsBar />

        {/* Keyboard Shortcuts Handler */}
        <KeyboardShortcuts />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
