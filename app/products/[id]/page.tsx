'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Button } from '@/components/ui/button'
import { mockProducts, mockOrders, mockCoupons } from '@/lib/mock-data'
import { useParams } from 'next/navigation'
import { ArrowLeft, TrendingUp, Users, DollarSign, Package } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0]
  const productOrders = mockOrders.filter(o => o.productId === product.id)
  const associatedCoupons = mockCoupons.filter(c => c.associatedProducts.includes(product.id))

  const stats = {
    conversionRate: ((product.salesCount / (product.salesCount + 50)) * 100).toFixed(1),
    avgOrderValue: productOrders.length > 0 ? (productOrders.reduce((sum, o) => sum + o.amount, 0) / productOrders.length).toFixed(2) : 0,
  }

  return (
    <DashboardLayout currentPage="products">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/products">
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">{product.name}</h1>
              <p className="text-sm text-neutral-400 mt-1">{product.description}</p>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Edit Product
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-500" />
                PRICE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-400">${product.price}</p>
              <p className="text-xs text-neutral-500 mt-1">{product.durationDays} days duration</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                TOTAL SALES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-400">{product.salesCount}</p>
              <p className="text-xs text-neutral-500 mt-1">${product.totalRevenue} revenue</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                CONVERSION RATE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-400">{stats.conversionRate}%</p>
              <p className="text-xs text-neutral-500 mt-1">Success rate</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-500" />
                STATUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm font-bold ${product.isActive ? 'text-green-400' : 'text-gray-400'}`}>
                {product.isActive ? 'Active' : 'Inactive'}
              </p>
              <p className="text-xs text-neutral-500 mt-1">Current state</p>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PRODUCT DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Product ID</p>
                <p className="text-sm text-white font-mono">{product.id}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Activation Type</p>
                <p className="text-sm text-white capitalize">{product.activationType}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Created At</p>
                <p className="text-sm text-white">{new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Last Updated</p>
                <p className="text-sm text-white">{new Date(product.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">PERFORMANCE METRICS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-3">Success Rate</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${product.successRate}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-green-400">{product.successRate.toFixed(1)}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-3">Failure Rate</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${100 - product.successRate}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-red-400">{(100 - product.successRate).toFixed(1)}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-3">Avg Order Value</p>
                <p className="text-2xl font-bold text-orange-400">${stats.avgOrderValue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Associated Coupons */}
        {associatedCoupons.length > 0 && (
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ASSOCIATED COUPONS ({associatedCoupons.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {associatedCoupons.map(coupon => (
                  <div key={coupon.id} className="p-4 bg-neutral-800 rounded border border-neutral-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-orange-400 font-mono">{coupon.code}</p>
                        <p className="text-xs text-neutral-500 mt-1">{coupon.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400">
                          {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                        </p>
                        <p className="text-xs text-neutral-500">{coupon.currentUsage}/{coupon.maxUsage} uses</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Orders */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">RECENT ORDERS ({productOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productOrders.length > 0 ? (
                productOrders.slice(0, 5).map(order => (
                  <Link key={order.id} href={`/orders/${order.id}`}>
                    <div className="p-3 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Order #{order.id}</p>
                          <p className="text-xs text-neutral-500 mt-1">User #{order.userId}</p>
                        </div>
                        <p className="text-sm font-bold text-green-400">${order.amount}</p>
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
      </div>
    </DashboardLayout>
  )
}
