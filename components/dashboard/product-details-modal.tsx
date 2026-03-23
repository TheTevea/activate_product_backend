'use client'

import { Product } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, TrendingUp, CheckCircle2, AlertCircle, Package, Clock, Zap } from 'lucide-react'

interface ProductDetailsModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  if (!product) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-900 border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-orange-500" />
              <div>
                <CardTitle className="text-lg font-bold text-white">{product.name}</CardTitle>
                <p className="text-xs text-neutral-400 mt-1">{product.slug}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-neutral-400 hover:text-orange-500"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-300 tracking-wider">BASIC INFORMATION</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-1">Description</p>
                  <p className="text-sm text-white">{product.description}</p>
                </div>
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium text-white">
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-300 tracking-wider">PRICING</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 mb-2">Price</p>
                  <p className="text-2xl font-bold text-orange-400">${product.price}</p>
                  <p className="text-xs text-neutral-400 mt-1">{product.currency}</p>
                </div>
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 mb-2">Duration</p>
                  <p className="text-2xl font-bold text-blue-400">{product.durationDays}</p>
                  <p className="text-xs text-neutral-400 mt-1">Days</p>
                </div>
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700 text-center">
                  <p className="text-xs text-neutral-500 mb-2">Activation</p>
                  <p className="text-sm font-bold text-green-400 uppercase">{product.activationType}</p>
                  <p className="text-xs text-neutral-400 mt-1">Type</p>
                </div>
              </div>
            </div>

            {/* Sales Performance */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-300 tracking-wider">SALES PERFORMANCE</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-neutral-500">Total Sales</p>
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-white">{product.salesCount}</p>
                  <p className="text-xs text-neutral-400 mt-2">Sales count</p>
                </div>
                <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-neutral-500">Total Revenue</p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-400">${product.totalRevenue}</p>
                  <p className="text-xs text-neutral-400 mt-2">Generated revenue</p>
                </div>
              </div>
            </div>

            {/* Success Rates */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-300 tracking-wider">SUCCESS METRICS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-neutral-500">Success Rate</p>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-400">{product.successRate}%</p>
                  <div className="w-full bg-neutral-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${product.successRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-neutral-500">Failure Rate</p>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold text-red-400">{product.failureRate}%</p>
                  <div className="w-full bg-neutral-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${product.failureRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Fields */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-300 tracking-wider">REQUIRED FIELDS</h3>
              <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
                {product.requiredFields.length > 0 ? (
                  <div className="space-y-2">
                    {product.requiredFields.map((field) => (
                      <div key={field} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <code className="text-sm text-neutral-300 font-mono">{field}</code>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400">No required fields</p>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-300 tracking-wider">TIMELINE</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Created
                  </p>
                  <p className="text-sm text-white font-mono">{product.createdAt.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-neutral-800 rounded border border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    Last Updated
                  </p>
                  <p className="text-sm text-white font-mono">{product.updatedAt.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-neutral-700">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 text-neutral-400 border-neutral-600 hover:bg-neutral-800"
              >
                Close
              </Button>
              <Button 
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Edit Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
