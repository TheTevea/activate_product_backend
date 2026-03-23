'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { mockCoupons, mockProducts } from '@/lib/mock-data'
import { Plus, Edit2, Trash2, Copy, Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useTabs } from '@/components/dashboard/tabs-context'
import { DeleteConfirmationDialog } from '@/components/dashboard/delete-confirmation-dialog'

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(mockCoupons)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [couponToDelete, setCouponToDelete] = useState<(typeof mockCoupons[0]) | null>(null)
  const { addTab } = useTabs()

  const handleOpenCouponTab = (couponId: string, couponCode: string) => {
    addTab({
      id: `coupon-${couponId}`,
      title: couponCode,
      type: 'coupon',
      url: `/coupons/${couponId}`,
    })
  }

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    description: '',
    maxUsage: 0,
    minOrderValue: 0,
  })

  const getProductNames = (productIds: string[]) => {
    return productIds.map(id => mockProducts.find(p => p.id === id)?.name || 'Unknown').join(', ')
  }

  const getCouponStatus = (status: string) => {
    if (status === 'active') return { bg: 'bg-green-900/20', text: 'text-green-400', label: 'Active' }
    if (status === 'inactive') return { bg: 'bg-gray-900/20', text: 'text-gray-400', label: 'Inactive' }
    return { bg: 'bg-red-900/20', text: 'text-red-400', label: 'Expired' }
  }

  const calculateSavings = (coupon: typeof mockCoupons[0]) => {
    if (coupon.type === 'percentage') {
      return `${coupon.value}% off`
    }
    return `$${coupon.value} off`
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`Copied "${code}" to clipboard`, {
      description: 'Coupon code ready to use',
      duration: 2000,
    })
  }

  const handleDeleteClick = (coupon: typeof mockCoupons[0]) => {
    setCouponToDelete(coupon)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (couponToDelete) {
      setCoupons(prev => prev.filter(c => c.id !== couponToDelete.id))
      setCouponToDelete(null)
    }
  }

  return (
    <DashboardLayout currentPage="coupons">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">COUPON MANAGEMENT</h1>
            <p className="text-neutral-400 text-sm mt-1">Create and manage discount codes</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 border-neutral-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Coupon</DialogTitle>
                <DialogDescription className="text-neutral-400">Add a new discount coupon for your products</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-xs text-neutral-400 uppercase">Coupon Code</label>
                  <Input placeholder="e.g., SAVE20" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 uppercase">Type</label>
                    <select className="w-full mt-2 bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded">
                      <option>Percentage</option>
                      <option>Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 uppercase">Value</label>
                    <Input placeholder="20" type="number" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 uppercase">Description</label>
                  <Input placeholder="20% off all products" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 uppercase">Max Usage</label>
                    <Input placeholder="500" type="number" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 uppercase">Min Order Value</label>
                    <Input placeholder="50" type="number" className="mt-2 bg-neutral-800 border-neutral-700 text-white" />
                  </div>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Create Coupon</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-neutral-400 text-xs uppercase tracking-wider">Active Coupons</div>
              <div className="text-3xl font-bold text-white mt-2">{coupons.filter(c => c.status === 'active').length}</div>
              <div className="text-xs text-green-400 mt-2">Actively in use</div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-neutral-400 text-xs uppercase tracking-wider">Total Usage</div>
              <div className="text-3xl font-bold text-white mt-2">{coupons.reduce((sum, c) => sum + c.currentUsage, 0)}</div>
              <div className="text-xs text-orange-400 mt-2">Coupons redeemed</div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-neutral-400 text-xs uppercase tracking-wider">Inactive</div>
              <div className="text-3xl font-bold text-white mt-2">{coupons.filter(c => c.status === 'inactive').length}</div>
              <div className="text-xs text-gray-400 mt-2">Disabled coupons</div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-neutral-400 text-xs uppercase tracking-wider">Expired</div>
              <div className="text-3xl font-bold text-white mt-2">{coupons.filter(c => c.status === 'expired').length}</div>
              <div className="text-xs text-red-400 mt-2">No longer valid</div>
            </CardContent>
          </Card>
        </div>

        {/* Coupons Table */}
        <DataTable
          title="ALL COUPONS"
          columns={[
            {
              key: 'code',
              label: 'Code',
              render: (v) => (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-orange-400 font-bold">{v}</span>
                  <button
                    onClick={() => copyToClipboard(v)}
                    className="text-neutral-500 hover:text-orange-400 transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
            {
              key: 'description',
              label: 'Description',
            },
            {
              key: 'value',
              label: 'Discount',
              render: (v, row) => (
                <span className="text-green-400 font-bold">
                  {row.type === 'percentage' ? `${v}%` : `$${v}`}
                </span>
              ),
            },
            {
              key: 'currentUsage',
              label: 'Usage',
              render: (v, row) => {
                const percentage = (v / row.maxUsage) * 100
                return (
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-neutral-700 rounded-full">
                      <div
                        className="h-1.5 bg-orange-500 rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-neutral-400">{v}/{row.maxUsage}</span>
                  </div>
                )
              },
            },
            {
              key: 'status',
              label: 'Status',
              render: (v) => {
                const status = getCouponStatus(v)
                return (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                )
              },
            },
            {
              key: 'expiryDate',
              label: 'Expiry',
              render: (v) => new Date(v).toLocaleDateString(),
            },
            {
              key: 'id',
              label: 'Actions',
              render: (v, row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenCouponTab(v, row.code)}
                    className="text-orange-500 hover:text-orange-400"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(row)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ),
            },
          ]}
          data={coupons}
          pageSize={10}
        />

        {/* Recent Coupon Usage */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">TOP PERFORMING COUPONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coupons
                .sort((a, b) => b.currentUsage - a.currentUsage)
                .slice(0, 5)
                .map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded border border-neutral-700">
                    <div>
                      <p className="font-bold text-white">{coupon.code}</p>
                      <p className="text-xs text-neutral-400">{coupon.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-400">{coupon.currentUsage} uses</p>
                      <p className="text-xs text-neutral-500">
                        {((coupon.currentUsage / coupon.maxUsage) * 100).toFixed(0)}% capacity
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Coupon"
        description="This coupon will be permanently deleted. You won't be able to recover it."
        itemName={couponToDelete?.code}
      />
    </DashboardLayout>
  )
}
