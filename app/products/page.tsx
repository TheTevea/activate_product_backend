'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { Button } from '@/components/ui/button'
import { mockProducts } from '@/lib/mock-data'
import { Plus, Eye, Trash2 } from 'lucide-react'
import { useTabs } from '@/components/dashboard/tabs-context'
import { DeleteConfirmationDialog } from '@/components/dashboard/delete-confirmation-dialog'

export default function ProductsPage() {
  const { addTab } = useTabs()
  const [products, setProducts] = useState(mockProducts)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<(typeof mockProducts[0]) | null>(null)

  const handleOpenProductTab = (productId: string, productName: string) => {
    addTab({
      id: `product-${productId}`,
      title: productName,
      type: 'product',
      url: `/products/${productId}`,
    })
  }

  const handleDeleteClick = (product: typeof mockProducts[0]) => {
    setProductToDelete(product)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete.id))
      setProductToDelete(null)
    }
  }
  return (
    <DashboardLayout currentPage="products">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">PRODUCT MANAGEMENT</h1>
            <p className="text-sm text-neutral-400 mt-1">Create and manage subscription products</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
        </div>

        {/* Product Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{mockProducts.length}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Products</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{mockProducts.filter(p => p.isActive).length}</div>
                <p className="text-xs text-neutral-400 mt-2">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">${mockProducts.reduce((sum, p) => sum + p.totalRevenue, 0).toLocaleString()}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Revenue</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{mockProducts.reduce((sum, p) => sum + p.salesCount, 0).toLocaleString()}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Sales</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <DataTable
          title="ALL PRODUCTS"
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'price', label: 'Price', render: (v) => `$${v}` },
            { key: 'durationDays', label: 'Duration', render: (v) => `${v} days` },
            { key: 'salesCount', label: 'Sales' },
            { key: 'totalRevenue', label: 'Revenue', render: (v) => `$${v.toLocaleString()}` },
            {
              key: 'successRate',
              label: 'Success Rate',
              render: (v) => <span className="text-green-400 font-medium">{v.toFixed(1)}%</span>,
            },
            {
              key: 'isActive',
              label: 'Status',
              render: (v) => (
                <span className={`text-xs font-medium ${v ? 'text-green-400' : 'text-gray-400'}`}>
                  {v ? 'Active' : 'Inactive'}
                </span>
              ),
            },
            {
              key: 'id',
              label: 'Action',
              render: (v, row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenProductTab(v, row.name)}
                    className="inline-flex items-center text-xs text-orange-500 hover:text-orange-400"
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
          data={mockProducts}
          pageSize={10}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          onConfirm={handleConfirmDelete}
          title="Delete Product"
          description="This product will be permanently deleted. All associated data will be removed."
          itemName={productToDelete?.name}
        />
      </div>
    </DashboardLayout>
  )
}
