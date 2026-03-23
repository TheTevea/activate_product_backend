'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { mockOrders, mockProducts } from '@/lib/mock-data'
import { Download, Eye, Trash2 } from 'lucide-react'
import { DeleteConfirmationDialog } from '@/components/dashboard/delete-confirmation-dialog'
import { useTabOpener } from '@/hooks/use-tab-opener'

export default function OrdersPage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [orders, setOrders] = useState(mockOrders)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<(typeof mockOrders[0]) | null>(null)
  const { openTab } = useTabOpener()

  const getProductName = (productId: string) => {
    return mockProducts.find(p => p.id === productId)?.name || 'Unknown'
  }

  const handleOpenOrderTab = (orderId: string) => {
    openTab(`Order #${orderId}`, `/orders/${orderId}`, 'order')
  }

  const handleDeleteClick = (order: typeof mockOrders[0]) => {
    setOrderToDelete(order)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      setOrders(prev => prev.filter(o => o.id !== orderToDelete.id))
      setOrderToDelete(null)
    }
  }
  return (
    <DashboardLayout currentPage="orders">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">ORDER MANAGEMENT</h1>
            <p className="text-sm text-neutral-400 mt-1">Track and manage all customer orders</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Order Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{mockOrders.length}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Orders</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{mockOrders.filter(o => o.status === 'activated').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Activated</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">{mockOrders.filter(o => o.status === 'processing').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Processing</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{mockOrders.filter(o => o.status === 'failed').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Failed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">${mockOrders.reduce((sum, o) => sum + o.amount, 0)}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Revenue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <DataTable
          title="ALL ORDERS"
          columns={[
            { key: 'id', label: 'Order ID' },
            { key: 'userId', label: 'User ID', render: (v) => `#${v}` },
            { 
              key: 'productId', 
              label: 'Product',
              render: (v) => (
                <button 
                  onClick={() => setSelectedProductId(v)}
                  className="text-orange-500 hover:text-orange-400 hover:underline"
                >
                  {getProductName(v)}
                </button>
              )
            },
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
              key: 'activationStatus',
              label: 'Activation',
              render: (v) => <StatusBadge status={v} />,
            },
            {
              key: 'createdAt',
              label: 'Created',
              render: (v) => new Date(v).toLocaleDateString(),
            },
            {
              key: 'id',
              label: 'Action',
              render: (v) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenOrderTab(v)}
                    className="inline-flex items-center text-xs text-orange-500 hover:text-orange-400"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      const order = orders.find(o => o.id === v)
                      if (order) handleDeleteClick(order)
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
          data={orders}
          pageSize={10}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          onConfirm={handleConfirmDelete}
          title="Delete Order"
          description="This order will be permanently deleted. You won't be able to recover it."
          itemName={orderToDelete ? `Order #${orderToDelete.id}` : undefined}
        />
      </div>
    </DashboardLayout>
  )
}
