'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Button } from '@/components/ui/button'
import { mockCoupons, mockProducts, mockOrders } from '@/lib/mock-data'
import { useParams } from 'next/navigation'
import { ArrowLeft, Copy, Calendar, Package, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function CouponDetailsPage() {
  const params = useParams()
  const couponId = params.id as string
  const coupon = mockCoupons.find(c => c.id === couponId) || mockCoupons[0]
  const associatedProducts = mockProducts.filter(p => coupon.associatedProducts.includes(p.id))
  const couponOrders = mockOrders.filter(o => {
    const hasCoupon = Math.random() > 0.5
    return hasCoupon
  }).slice(0, 5)

  const usagePercentage = (coupon.currentUsage / coupon.maxUsage) * 100

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coupon.code)
  }

  return (
    <DashboardLayout currentPage="coupons">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/coupons">
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-orange-500">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider font-mono">{coupon.code}</h1>
              <p className="text-sm text-neutral-400 mt-1">{coupon.description}</p>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Edit Coupon
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">DISCOUNT VALUE</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-400">
                {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
              </p>
              <p className="text-xs text-neutral-500 mt-1">{coupon.type} discount</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">USAGE</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-400">{coupon.currentUsage}</p>
              <p className="text-xs text-neutral-500 mt-1">of {coupon.maxUsage} available</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">CAPACITY</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-400">{usagePercentage.toFixed(0)}%</p>
              <p className="text-xs text-neutral-500 mt-1">remaining: {coupon.maxUsage - coupon.currentUsage}</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-neutral-400 tracking-wider">STATUS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm font-bold ${
                coupon.status === 'active' ? 'text-green-400' :
                coupon.status === 'inactive' ? 'text-gray-400' :
                'text-red-400'
              }`}>
                {coupon.status === 'active' ? 'Active' : coupon.status === 'inactive' ? 'Inactive' : 'Expired'}
              </p>
              <p className="text-xs text-neutral-500 mt-1">Current state</p>
            </CardContent>
          </Card>
        </div>

        {/* Coupon Code & Copy */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">COUPON CODE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-neutral-800 rounded border border-neutral-700">
              <p className="flex-1 text-2xl font-bold font-mono text-orange-400">{coupon.code}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="text-orange-500 border-orange-500 hover:bg-orange-500/10"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coupon Details */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">COUPON DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Created At</p>
                <p className="text-sm text-white">{new Date(coupon.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Expiry Date</p>
                <p className="text-sm text-white">{new Date(coupon.expiryDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Min Order Value</p>
                <p className="text-sm text-white">${coupon.minOrderValue || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Max Discount</p>
                <p className="text-sm text-white">${coupon.maxDiscount || 'Unlimited'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Created By</p>
                <p className="text-sm text-white">{coupon.createdBy}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase mb-2">Last Updated</p>
                <p className="text-sm text-white">{new Date(coupon.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Progress */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">USAGE PROGRESS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-400">Total Usage</span>
                <span className="text-sm font-bold text-white">{coupon.currentUsage} / {coupon.maxUsage}</span>
              </div>
              <div className="w-full h-3 bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all"
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <p className="text-xs text-neutral-400">Used</p>
                <p className="text-lg font-bold text-orange-400 mt-1">{coupon.currentUsage}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-400">Remaining</p>
                <p className="text-lg font-bold text-blue-400 mt-1">{coupon.maxUsage - coupon.currentUsage}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-400">Capacity</p>
                <p className="text-lg font-bold text-green-400 mt-1">{usagePercentage.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Associated Products */}
        {associatedProducts.length > 0 && (
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-500" />
                ASSOCIATED PRODUCTS ({associatedProducts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {associatedProducts.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="p-4 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-white">{product.name}</p>
                          <p className="text-xs text-neutral-500 mt-1">${product.price} · {product.durationDays} days</p>
                        </div>
                        <p className="text-sm font-bold text-green-400">{product.salesCount} sales</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
