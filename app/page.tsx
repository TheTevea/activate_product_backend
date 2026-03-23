'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { StatCard } from '@/components/dashboard/stat-card'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { mockDashboardStats, mockOrders, mockAlerts, mockReports, mockFeedback, mockCoupons } from '@/lib/mock-data'
import { Users, Package, ShoppingCart, TrendingUp, AlertTriangle, Clock, FileText, MessageSquare, Tag } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = mockDashboardStats

  return (
    <DashboardLayout currentPage="dashboard">
      <div className="p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Total Users" 
            value={stats.totalUsers.toLocaleString()} 
            icon={<Users className="w-5 h-5" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard 
            label="Active Products" 
            value={stats.totalActiveProducts} 
            icon={<Package className="w-5 h-5" />}
          />
          <StatCard 
            label="Total Orders" 
            value={stats.totalOrders.toLocaleString()} 
            icon={<ShoppingCart className="w-5 h-5" />}
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatCard 
            label="Today Revenue" 
            value={`$${stats.todayRevenue.toFixed(2)}`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: 5.2, isPositive: true }}
          />
        </div>

        {/* Order Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Activated Orders" value={stats.activatedOrders} subtext={`${((stats.activatedOrders / stats.totalOrders) * 100).toFixed(1)}% of total`} />
          <StatCard label="Processing Orders" value={stats.processingOrders} subtext="Currently in queue" />
          <StatCard label="Failed Orders" value={stats.failedOrders} subtext="Require attention" />
          <StatCard label="Manual Review" value={stats.manualReviewOrders} subtext="Awaiting decision" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts */}
          <Card className="lg:col-span-1 bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                RECENT ALERTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded border-l-2 ${
                      alert.type === 'error'
                        ? 'bg-red-900/20 border-red-500'
                        : alert.type === 'warning'
                          ? 'bg-orange-900/20 border-orange-500'
                          : 'bg-blue-900/20 border-blue-500'
                    }`}
                  >
                    <p className="text-xs font-medium text-white">{alert.title}</p>
                    <p className="text-xs text-neutral-400 mt-1">{alert.message}</p>
                    <p className="text-xs text-neutral-500 mt-2">{alert.createdAt.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="lg:col-span-1 bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SYSTEM STATUS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400">API Uptime</span>
                  <span className="text-sm font-bold text-green-400">99.9%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400">Database Health</span>
                  <span className="text-sm font-bold text-green-400">Healthy</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400">Queue Processing</span>
                  <span className="text-sm font-bold text-orange-400">98.5%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1">
                  <div className="bg-orange-500 h-1 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Metrics */}
          <Card className="lg:col-span-1 bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                CRITICAL METRICS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Failed Activations</span>
                <span className="text-sm font-bold text-red-400">{stats.failedActivationCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Payments Pending</span>
                <span className="text-sm font-bold text-orange-400">{stats.paymentPendingCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Month Revenue</span>
                <span className="text-sm font-bold text-green-400">${stats.monthRevenue.toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Avg Order Value</span>
                <span className="text-sm font-bold text-white">${(stats.monthRevenue / stats.totalOrders).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Table */}
        <DataTable
          title="RECENT ORDERS"
          columns={[
            { key: 'id', label: 'Order ID' },
            { key: 'userId', label: 'User', render: (v) => `User #${v}` },
            { key: 'productId', label: 'Product' },
            { key: 'amount', label: 'Amount', render: (v) => `$${v}` },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <StatusBadge status={v} />,
            },
            {
              key: 'paymentStatus',
              label: 'Payment',
              render: (v) => <StatusBadge status={v} />,
            },
            {
              key: 'createdAt',
              label: 'Created',
              render: (v) => new Date(v).toLocaleDateString(),
            },
          ]}
          data={mockOrders}
          pageSize={5}
        />

        {/* Reports and Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reports */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  RECENT REPORTS
                </CardTitle>
                <Link href="/reports" className="text-xs text-orange-500 hover:text-orange-400">
                  View All →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockReports.slice(0, 2).map((report) => (
                  <div key={report.id} className="p-3 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{report.title}</p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {report.startDate.toLocaleDateString()} to {report.endDate.toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded whitespace-nowrap ml-2">
                        {report.type}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">{report.generatedAt.toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  RECENT FEEDBACK
                </CardTitle>
                <Link href="/feedback" className="text-xs text-orange-500 hover:text-orange-400">
                  View All →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockFeedback.slice(0, 2).map((feedback) => (
                  <div key={feedback.id} className="p-3 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white truncate">{feedback.subject}</p>
                        <p className="text-xs text-neutral-500 mt-1">{feedback.email}</p>
                      </div>
                      <div className="flex gap-1 ml-2 flex-shrink-0">
                        <span className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${
                          feedback.priority === 'high'
                            ? 'bg-red-900/20 text-red-400'
                            : feedback.priority === 'medium'
                              ? 'bg-yellow-900/20 text-yellow-400'
                              : 'bg-blue-900/20 text-blue-400'
                        }`}>
                          {feedback.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded whitespace-nowrap ${
                          feedback.status === 'new'
                            ? 'bg-blue-900/20 text-blue-400'
                            : feedback.status === 'in_progress'
                              ? 'bg-orange-900/20 text-orange-400'
                              : feedback.status === 'resolved'
                                ? 'bg-green-900/20 text-green-400'
                                : 'bg-neutral-700 text-neutral-400'
                        }`}>
                          {feedback.status === 'in_progress' ? 'In Progress' : feedback.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2">{feedback.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Coupons */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" />
                  ACTIVE COUPONS
                </CardTitle>
                <Link href="/coupons" className="text-xs text-orange-500 hover:text-orange-400">
                  View All →
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCoupons.filter(c => c.status === 'active').slice(0, 2).map((coupon) => (
                  <div key={coupon.id} className="p-3 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white font-mono">{coupon.code}</p>
                        <p className="text-xs text-neutral-500 mt-1">{coupon.description}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs font-bold rounded whitespace-nowrap ml-2">
                        {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">{coupon.currentUsage}/{coupon.maxUsage} uses</span>
                      <span className="text-orange-400">{((coupon.currentUsage / coupon.maxUsage) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
