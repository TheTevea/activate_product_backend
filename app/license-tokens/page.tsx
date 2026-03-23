'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { mockLicenseTokens, mockProducts } from '@/lib/mock-data'
import { Download, Eye, Ban, RefreshCw, Copy, Check } from 'lucide-react'
import { LicenseTokenStatus } from '@/lib/types'

export default function LicenseTokensPage() {
  const [tokens, setTokens] = useState(mockLicenseTokens)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const getProductName = (productId: string) => {
    return mockProducts.find(p => p.id === productId)?.name || 'Unknown'
  }

  const handleCopyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleToggleStatus = (id: string, currentStatus: LicenseTokenStatus) => {
    const newStatus = currentStatus === 'revoked' ? 'activated' : 'revoked'
    setTokens(prev => 
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    )
  }

  return (
    <DashboardLayout currentPage="license-tokens">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">LICENSE TOKENS</h1>
            <p className="text-sm text-neutral-400 mt-1">Manage purchased keys, revoke abuse, copy tokens</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{tokens.length}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Tokens</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{tokens.filter(t => t.status === 'paid_not_activated').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Not Activated</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{tokens.filter(t => t.status === 'activated').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Activated</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{tokens.filter(t => t.status === 'revoked').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Revoked</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tokens Table */}
        <DataTable
          title="ALL LICENSE TOKENS"
          columns={[
            { 
              key: 'tokenCode', 
              label: 'Token Code',
              render: (v, row) => (
                <div className="font-mono text-xs bg-neutral-800 px-2 py-1 rounded inline-flex items-center gap-2">
                  <span className="truncate w-32 md:w-auto">{v}</span>
                  <button 
                    onClick={() => handleCopyCode(row.id, v)}
                    className="text-neutral-400 hover:text-orange-400 transition-colors"
                  >
                    {copiedId === row.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )
            },
            { key: 'userId', label: 'User ID', render: (v) => `#${v}` },
            { 
              key: 'productId', 
              label: 'Product',
              render: (v) => getProductName(v)
            },
            { key: 'orderId', label: 'Order ID', render: (v) => <span className="text-neutral-400">#{v.replace('ord_', '')}</span> },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <StatusBadge status={v} />,
            },
            {
              key: 'activatedAt',
              label: 'Activated',
              render: (v) => v ? new Date(v).toLocaleDateString() : <span className="text-neutral-500">-</span>,
            },
            {
              key: 'verifyAttemptCount',
              label: 'Attempts',
              render: (v) => <span className={v > 5 ? 'text-red-400 font-bold' : ''}>{v}</span>,
            },
            {
              key: 'id',
              label: 'Action',
              render: (v, row) => (
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-orange-500 hover:text-orange-400 bg-orange-500/10 rounded" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  {row.status === 'revoked' ? (
                    <button 
                      onClick={() => handleToggleStatus(row.id, row.status)}
                      className="p-1.5 text-green-500 hover:text-green-400 bg-green-500/10 rounded" 
                      title="Reactivate Token"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleToggleStatus(row.id, row.status)}
                      className="p-1.5 text-red-500 hover:text-red-400 bg-red-500/10 rounded" 
                      title="Revoke Token"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          data={tokens}
          pageSize={10}
        />
      </div>
    </DashboardLayout>
  )
}
