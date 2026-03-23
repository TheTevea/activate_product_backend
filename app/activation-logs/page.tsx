'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { mockActivationLogs, mockProducts } from '@/lib/mock-data'
import { Eye, Download, CheckCircle2, XCircle } from 'lucide-react'

export default function ActivationLogsPage() {
  const [showFailedOnly, setShowFailedOnly] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getProductName = (productId: string) => {
    return mockProducts.find(p => p.id === productId)?.name || 'Unknown'
  }

  const logStats = {
    total: mockActivationLogs.length,
    success: mockActivationLogs.filter((l) => l.result === 'success').length,
    failed: mockActivationLogs.filter((l) => l.result === 'failed').length,
    uniqueTokens: new Set(mockActivationLogs.map(l => l.tokenId)).size,
  }

  const filteredLogs = mockActivationLogs.filter(log => {
    if (showFailedOnly && log.result !== 'failed') return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        log.tokenCode.toLowerCase().includes(term) ||
        log.userId.toLowerCase().includes(term) ||
        log.ipAddress.toLowerCase().includes(term)
      )
    }
    return true
  })

  return (
    <DashboardLayout currentPage="activation-logs">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">ACTIVATION LOGS</h1>
            <p className="text-sm text-neutral-400 mt-1">Track every verification attempt</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Total Attempts</div>
            <div className="text-2xl font-bold text-white">{logStats.total}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Successful</div>
            <div className="text-2xl font-bold text-green-400">{logStats.success}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-400">{logStats.failed}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Unique Tokens</div>
            <div className="text-2xl font-bold text-blue-400">{logStats.uniqueTokens}</div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Token code, user ID, IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Status</label>
                <select 
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 focus:outline-none focus:border-orange-500"
                  onChange={(e) => setShowFailedOnly(e.target.value === 'failed')}
                  value={showFailedOnly ? 'failed' : 'all'}
                >
                  <option value="all">All Attempts</option>
                  <option value="success">Success Only</option>
                  <option value="failed">Failed Only</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Product</label>
                <select className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 focus:outline-none focus:border-orange-500">
                  <option>All Products</option>
                  {mockProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => setShowFailedOnly(!showFailedOnly)}
                  className={`w-full px-3 py-2 border rounded text-sm transition-colors ${
                    showFailedOnly 
                      ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                      : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                >
                  {showFailedOnly ? 'Showing Failed Only' : 'Show Failed Only'}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <Card key={log.id} className="bg-neutral-900 border-neutral-700 relative overflow-hidden">
              {/* Left Border Status Indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${log.result === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
              
              <CardContent className="p-4 pl-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <div className="flex items-center gap-1.5 font-mono text-sm bg-neutral-800 px-2 py-1 rounded">
                        <span className="text-neutral-500">Key:</span> 
                        <span className="text-white">{log.tokenCode}</span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                          log.result === 'success'
                            ? 'bg-green-900/20 text-green-300 border border-green-900/50'
                            : 'bg-red-900/20 text-red-300 border border-red-900/50'
                        }`}
                      >
                        {log.result === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {log.result.toUpperCase()}
                      </span>
                      <span className="text-xs text-neutral-500">Product: <span className="text-orange-400">{getProductName(log.productId)}</span></span>
                    </div>

                    {/* Failed Reason Alert */}
                    {log.result === 'failed' && log.failureReason && (
                      <div className="my-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 flex items-start gap-2">
                        <span className="font-bold shrink-0">Reason:</span>
                        <span>{log.failureReason}</span>
                      </div>
                    )}

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      <div>
                        <div className="text-xs text-neutral-500 mb-0.5">Time</div>
                        <div className="text-sm text-neutral-300">{log.attemptTime.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 mb-0.5">IP & Location</div>
                        <div className="text-sm text-neutral-300">
                          {log.ipAddress}
                          {log.location && <span className="block text-xs text-neutral-500">{log.location}</span>}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 mb-0.5">Device</div>
                        <div className="text-sm text-neutral-300">{log.deviceInfo}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500 mb-0.5">Source</div>
                        <div className="text-sm text-neutral-300 uppercase">
                          {log.requestSource?.replace('_', ' ')}
                          {log.appVersion && <span className="ml-1 text-neutral-500">({log.appVersion})</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors text-neutral-400 hover:text-orange-400 ml-4 shrink-0" title="View Full Details">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center bg-neutral-900 border border-neutral-700 rounded border-dashed">
              <p className="text-neutral-500">No activation logs found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
