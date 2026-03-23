'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardLayout } from '@/components/dashboard/layout'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { mockOrders, mockUsers, mockProducts, mockPayments } from '@/lib/mock-data'
import { ArrowLeft, Package, User, CreditCard, Zap, FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTabOpener } from '@/hooks/use-tab-opener'

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id as string
  const { openTab } = useTabOpener()
  
  const order = mockOrders.find(o => o.id === orderId)
  const user = order ? mockUsers.find(u => u.id === order.userId) : null
  const product = order ? mockProducts.find(p => p.id === order.productId) : null
  const payment = order ? mockPayments.find(p => p.orderId === order.id) : null
  const job = order
    ? {
        id: `job_${order.id}`,
        status: order.activationStatus,
        retryCount: order.retryCount,
        maxRetries: 3,
        errorMessage: order.activationStatus === 'failed' ? order.adminNotes || 'Activation failed' : undefined,
        requestPayload: order.inputData,
        responsePayload: order.activatedAt ? { activatedAt: order.activatedAt.toISOString() } : undefined,
      }
    : null

  if (!order || !user || !product) {
    return (
      <DashboardLayout currentPage="orders">
        <div className="p-6">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Order Not Found</h2>
            <p className="text-neutral-400 mb-6">The order you're looking for doesn't exist.</p>
            <Link href="/orders">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentPage="orders">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/orders">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-neutral-400 hover:text-orange-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider">ORDER DETAILS</h1>
              <p className="text-sm text-neutral-400 mt-1">Order ID: {order.id}</p>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-neutral-500 tracking-wider">ORDER STATUS</p>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-sm text-neutral-400">Created: {order.createdAt.toLocaleString()}</p>
              <p className="text-sm text-neutral-400">Updated: {order.updatedAt.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-neutral-500 tracking-wider">PAYMENT</p>
                <StatusBadge status={order.paymentStatus} />
              </div>
              <p className="text-2xl font-bold text-green-400">${order.amount}</p>
              <p className="text-sm text-neutral-400 mt-2">{order.currency}</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-neutral-500 tracking-wider">ACTIVATION</p>
                <StatusBadge status={order.activationStatus} />
              </div>
              <p className="text-sm text-neutral-400">Retries: {order.retryCount} / 3</p>
              {order.activatedAt && (
                <p className="text-sm text-neutral-400">
                  Activated: {order.activatedAt.toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Order & User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Information */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4 border-b border-neutral-700">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" />
                  CUSTOMER INFORMATION
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">User ID</p>
                    <p className="text-sm font-mono text-white">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Telegram ID</p>
                    <p className="text-sm font-mono text-white">{user.telegramId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Username</p>
                    <p className="text-sm text-white">@{user.username}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Full Name</p>
                    <p className="text-sm text-white">{user.firstName} {user.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Email</p>
                    <p className="text-sm text-white">{user.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Status</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      user.status === 'active' ? 'bg-green-900/20 text-green-400' :
                      user.status === 'blocked' ? 'bg-red-900/20 text-red-400' :
                      'bg-neutral-700 text-neutral-400'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-2">User Statistics</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-neutral-400">Total Orders: <span className="text-white font-bold">{user.totalOrders}</span></p>
                    <p className="text-neutral-400">Successful: <span className="text-green-400 font-bold">{user.successfulOrders}</span></p>
                    <p className="text-neutral-400">Failed: <span className="text-red-400 font-bold">{user.failedOrders}</span></p>
                    <p className="text-neutral-400">Total Spent: <span className="text-orange-400 font-bold">${user.totalSpending}</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4 border-b border-neutral-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-500" />
                    PRODUCT DETAILS
                  </CardTitle>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => openTab(product.name, `/products/${product.id}`, 'product')}
                    className="text-xs text-orange-500 hover:text-orange-400"
                  >
                    View Full Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Product Name</p>
                    <p className="text-sm font-bold text-white">{product.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Slug</p>
                    <p className="text-sm font-mono text-white">{product.slug}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Price</p>
                    <p className="text-lg font-bold text-orange-400">${product.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Duration</p>
                    <p className="text-sm text-white">{product.durationDays} days</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Activation Type</p>
                    <p className="text-sm uppercase font-bold text-green-400">{product.activationType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Status</p>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      product.isActive ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-2">Description</p>
                  <p className="text-sm text-neutral-300">{product.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-800 rounded border border-neutral-700 text-center">
                    <p className="text-xs text-neutral-500 mb-1">Success Rate</p>
                    <p className="text-lg font-bold text-green-400">{product.successRate}%</p>
                  </div>
                  <div className="p-3 bg-neutral-800 rounded border border-neutral-700 text-center">
                    <p className="text-xs text-neutral-500 mb-1">Failure Rate</p>
                    <p className="text-lg font-bold text-red-400">{product.failureRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Data */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4 border-b border-neutral-700">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  ORDER DATA
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-2">Target URL</p>
                  <code className="text-sm text-neutral-300 bg-neutral-800 p-2 rounded block break-all">{order.targetUrl}</code>
                </div>
                {Object.keys(order.inputData).length > 0 && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Input Data</p>
                    <pre className="text-sm text-neutral-300 bg-neutral-800 p-3 rounded overflow-auto max-h-40">
                      {JSON.stringify(order.inputData, null, 2)}
                    </pre>
                  </div>
                )}
                {order.adminNotes && (
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Admin Notes</p>
                    <p className="text-sm text-neutral-300 bg-neutral-800 p-3 rounded">{order.adminNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Payment & Job Info */}
          <div className="space-y-6">
            {/* Payment Information */}
            {payment && (
              <Card className="bg-neutral-900 border-neutral-700">
                <CardHeader className="pb-4 border-b border-neutral-700">
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-orange-500" />
                    PAYMENT
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Payment ID</p>
                    <p className="text-sm font-mono text-white">{payment.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Method</p>
                    <span className="text-sm font-medium uppercase px-2 py-1 bg-neutral-700 text-neutral-300 rounded">
                      {payment.method}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Status</p>
                    <StatusBadge status={payment.status} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Amount</p>
                    <p className="text-xl font-bold text-green-400">${payment.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Transaction Reference</p>
                    <p className="text-xs font-mono text-neutral-400">{payment.transactionReference}</p>
                  </div>
                  {payment.paidAt && (
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Paid At</p>
                      <p className="text-sm text-white">{payment.paidAt.toLocaleString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Activation Job */}
            {job && (
              <Card className="bg-neutral-900 border-neutral-700">
                <CardHeader className="pb-4 border-b border-neutral-700">
                  <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    ACTIVATION JOB
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Job ID</p>
                    <p className="text-sm font-mono text-white">{job.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Status</p>
                    <StatusBadge status={job.status} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Retries</p>
                    <p className="text-sm text-white">{job.retryCount} / {job.maxRetries}</p>
                    <div className="w-full bg-neutral-700 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full" 
                        style={{ width: `${(job.retryCount / job.maxRetries) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  {job.errorMessage && (
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Error Message</p>
                      <p className="text-sm text-red-400">{job.errorMessage}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Request Payload</p>
                    <pre className="text-xs text-neutral-300 bg-neutral-800 p-2 rounded overflow-auto max-h-24">
                      {JSON.stringify(job.requestPayload, null, 2)}
                    </pre>
                  </div>
                  {job.responsePayload && (
                    <div>
                      <p className="text-xs text-neutral-500 mb-2">Response Payload</p>
                      <pre className="text-xs text-neutral-300 bg-neutral-800 p-2 rounded overflow-auto max-h-24">
                        {JSON.stringify(job.responsePayload, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="bg-neutral-900 border-neutral-700">
              <CardHeader className="pb-4 border-b border-neutral-700">
                <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ACTIONS</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-2">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Retry Activation
                </Button>
                <Button variant="outline" className="w-full text-neutral-400 border-neutral-600 hover:bg-neutral-800">
                  Manual Review
                </Button>
                <Button variant="outline" className="w-full text-neutral-400 border-neutral-600 hover:bg-neutral-800">
                  Refund Order
                </Button>
                <Button variant="outline" className="w-full text-neutral-400 border-neutral-600 hover:bg-neutral-800">
                  Add Note
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}
