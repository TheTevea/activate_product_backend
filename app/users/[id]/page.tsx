'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Button } from '@/components/ui/button'
import { mockUsers, mockOrders } from '@/lib/mock-data'
import { useParams } from 'next/navigation'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/dashboard/status-badge'

export default function UserDetailsPage() {
  const params = useParams()
  const userId = params.id as string
  const user = mockUsers.find(u => u.id === userId) || mockUsers[0]
  const userOrders = mockOrders.filter(o => o.userId === user.id)

  return (
    <DashboardLayout currentPage="users">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/users">
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-neutral-400 mt-1">@{user.username}</p>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Block User
          </Button>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">Telegram ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-white">{user.telegramId}</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusBadge status={user.status} />
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-green-400">{user.totalOrders}</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">Total Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-orange-400">${user.totalSpending}</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">CONTACT INFORMATION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400 uppercase">Email</p>
                  <p className="text-sm text-white mt-1">{user.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400 uppercase">Phone</p>
                  <p className="text-sm text-white mt-1">{user.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400 uppercase">Country</p>
                  <p className="text-sm text-white mt-1">{user.country || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-400 uppercase">Registered</p>
                  <p className="text-sm text-white mt-1">{new Date(user.registeredAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Orders */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">USER ORDERS ({userOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userOrders.length > 0 ? (
                userOrders.map(order => (
                  <Link key={order.id} href={`/orders/${order.id}`}>
                    <div className="p-4 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Order #{order.id}</p>
                          <p className="text-xs text-neutral-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-400">${order.amount}</p>
                          <StatusBadge status={order.status} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-neutral-400">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Activity */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ACCOUNT ACTIVITY</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b border-neutral-700">
              <span className="text-sm text-neutral-400">Last Purchase</span>
              <span className="text-sm text-white">{new Date(user.lastPurchaseDate || Date.now()).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-700">
              <span className="text-sm text-neutral-400">Account Age</span>
              <span className="text-sm text-white">
                {Math.floor((Date.now() - new Date(user.registeredAt).getTime()) / (1000 * 60 * 60 * 24))} days
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-neutral-400">Lifetime Value</span>
              <span className="text-sm font-bold text-green-400">${user.totalSpending}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
