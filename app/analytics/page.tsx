'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { StatCard } from '@/components/dashboard/stat-card'
import { mockDashboardStats, mockOrders } from '@/lib/mock-data'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  const stats = mockDashboardStats
  
  // Calculate metrics
  const avgOrderValue = stats.totalOrders > 0 ? (stats.monthRevenue / stats.totalOrders).toFixed(2) : 0
  const successRate = ((stats.activatedOrders / stats.totalOrders) * 100).toFixed(1)
  const failureRate = ((stats.failedOrders / stats.totalOrders) * 100).toFixed(1)
  const conversionRate = (((stats.activatedOrders + stats.processingOrders) / stats.totalOrders) * 100).toFixed(1)

  // Revenue by product
  const revenueByProduct = [
    { name: 'Premium Access', value: 33858, percentage: 46.5 },
    { name: 'Enterprise Package', value: 22455, percentage: 30.8 },
    { name: 'Starter Plan', value: 24824, percentage: 22.7 },
  ]

  // Daily revenue
  const dailyRevenue = [
    { day: 'Mon', value: 4200 },
    { day: 'Tue', value: 3800 },
    { day: 'Wed', value: 5100 },
    { day: 'Thu', value: 4600 },
    { day: 'Fri', value: 6200 },
    { day: 'Sat', value: 3200 },
    { day: 'Sun', value: 2550 },
  ]

  return (
    <DashboardLayout currentPage="analytics">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">ANALYTICS & REPORTS</h1>
          <p className="text-sm text-neutral-400 mt-1">Business performance and growth metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Success Rate" 
            value={`${successRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: 2.3, isPositive: true }}
          />
          <StatCard 
            label="Failure Rate" 
            value={`${failureRate}%`}
            icon={<TrendingDown className="w-5 h-5" />}
            trend={{ value: 1.5, isPositive: false }}
          />
          <StatCard 
            label="Conversion Rate" 
            value={`${conversionRate}%`}
            icon={<BarChart3 className="w-5 h-5" />}
            trend={{ value: 4.2, isPositive: true }}
          />
          <StatCard 
            label="Avg Order Value" 
            value={`$${avgOrderValue}`}
            trend={{ value: 3.1, isPositive: true }}
          />
        </div>

        {/* Revenue Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Product */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">REVENUE BY PRODUCT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueByProduct.map((product, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-neutral-300">{product.name}</span>
                    <span className="text-sm font-bold text-orange-400">${product.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-neutral-500">{product.percentage}% of total</span>
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-700">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-400">Total Revenue</span>
                  <span className="text-sm font-bold text-green-400">${revenueByProduct.reduce((sum, p) => sum + p.value, 0).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Revenue Trend */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">DAILY REVENUE TREND</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyRevenue.map((day, idx) => {
                  const maxValue = Math.max(...dailyRevenue.map(d => d.value))
                  const percentage = (day.value / maxValue) * 100
                  return (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-300">{day.day}</span>
                        <span className="text-sm font-bold text-orange-400">${day.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Distribution */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ORDER STATUS DISTRIBUTION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.activatedOrders}</div>
                <p className="text-xs text-neutral-400 mt-1">Activated</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.processingOrders}</div>
                <p className="text-xs text-neutral-400 mt-1">Processing</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.pendingOrders}</div>
                <p className="text-xs text-neutral-400 mt-1">Pending</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.failedOrders}</div>
                <p className="text-xs text-neutral-400 mt-1">Failed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-400">{stats.manualReviewOrders}</div>
                <p className="text-xs text-neutral-400 mt-1">Manual Review</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.totalOrders}</div>
                <p className="text-xs text-neutral-400 mt-1">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Users */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">TOP PERFORMING METRICS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Most Valuable Customers</h3>
                <div className="space-y-2">
                  {[
                    { rank: 1, name: 'User #1', value: '$2,400', orders: 12 },
                    { rank: 2, name: 'User #2', value: '$1,890', orders: 8 },
                    { rank: 3, name: 'User #4', value: '$1,650', orders: 7 },
                  ].map((item) => (
                    <div key={item.rank} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                      <div className="flex items-center gap-3">
                        <span className="text-orange-500 font-bold">#{item.rank}</span>
                        <span className="text-sm text-neutral-300">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-400">{item.value}</div>
                        <div className="text-xs text-neutral-500">{item.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Error Distribution</h3>
                <div className="space-y-2">
                  {[
                    { error: 'Timeout', count: 34, percentage: 38.2 },
                    { error: 'Invalid URL', count: 28, percentage: 31.5 },
                    { error: 'Auth Failed', count: 16, percentage: 18.0 },
                    { error: 'Other', count: 11, percentage: 12.3 },
                  ].map((item) => (
                    <div key={item.error}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-300">{item.error}</span>
                        <span className="text-sm font-bold text-red-400">{item.count}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
