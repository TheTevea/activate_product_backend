'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { mockLogs } from '@/lib/mock-data'
import { Eye, Filter, Download } from 'lucide-react'

export default function LogsPage() {
  const actionColors: Record<string, string> = {
    UPDATE_ORDER_STATUS: 'bg-orange-900/20 text-orange-300',
    RETRY_ACTIVATION_JOB: 'bg-blue-900/20 text-blue-300',
    CONFIRM_PAYMENT: 'bg-green-900/20 text-green-300',
    BLOCK_USER: 'bg-red-900/20 text-red-300',
    ADD_INTERNAL_NOTE: 'bg-purple-900/20 text-purple-300',
  }

  const targetTypeIcons: Record<string, string> = {
    user: '👤',
    order: '📦',
    product: '🏷️',
    payment: '💳',
    job: '⚙️',
    setting: '⚙️',
  }

  const logStats = {
    total: mockLogs.length,
    success: mockLogs.filter((l) => l.status === 'success').length,
    failed: mockLogs.filter((l) => l.status === 'failed').length,
    today: mockLogs.filter((l) => {
      const logDate = new Date(l.timestamp)
      const today = new Date()
      return logDate.toDateString() === today.toDateString()
    }).length,
  }

  return (
    <DashboardLayout currentPage="logs">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">AUDIT LOGS & SYSTEM ACTIVITY</h1>
          <p className="text-sm text-neutral-400 mt-1">Track admin actions, system events, and audit trail</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Total Logs</div>
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
            <div className="text-sm text-neutral-400 mb-1">Today</div>
            <div className="text-2xl font-bold text-orange-400">{logStats.today}</div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Actor</label>
                <input
                  type="text"
                  placeholder="Filter by admin email..."
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Action</label>
                <select className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 focus:outline-none focus:border-orange-500">
                  <option>All Actions</option>
                  <option>UPDATE_ORDER_STATUS</option>
                  <option>RETRY_ACTIVATION_JOB</option>
                  <option>CONFIRM_PAYMENT</option>
                  <option>BLOCK_USER</option>
                  <option>ADD_INTERNAL_NOTE</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Target Type</label>
                <select className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 focus:outline-none focus:border-orange-500">
                  <option>All Types</option>
                  <option>user</option>
                  <option>order</option>
                  <option>product</option>
                  <option>payment</option>
                  <option>job</option>
                  <option>setting</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-2">Status</label>
                <select className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 focus:outline-none focus:border-orange-500">
                  <option>All Statuses</option>
                  <option>success</option>
                  <option>failed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <div className="space-y-3">
          {mockLogs.map((log) => (
            <Card key={log.id} className="bg-neutral-900 border-neutral-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{targetTypeIcons[log.targetType]}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${actionColors[log.action] || 'bg-neutral-800 text-neutral-400'}`}>
                        {log.action}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          log.status === 'success'
                            ? 'bg-green-900/20 text-green-300'
                            : 'bg-red-900/20 text-red-300'
                        }`}
                      >
                        {log.status}
                      </span>
                      {log.ipAddress && (
                        <span className="text-xs text-neutral-500">{log.ipAddress}</span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <div className="text-xs text-neutral-500">Actor</div>
                        <div className="text-sm text-neutral-300">{log.actor}</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Target</div>
                        <div className="text-sm text-neutral-300">
                          {log.targetType.toUpperCase()} #{log.targetId}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Timestamp</div>
                        <div className="text-sm text-neutral-300">{log.timestamp.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Metadata */}
                    {Object.keys(log.metadata).length > 0 && (
                      <div className="p-3 bg-neutral-800 rounded text-xs font-mono text-neutral-400">
                        <div className="text-neutral-500 mb-2">Metadata</div>
                        <pre className="overflow-x-auto text-xs">
                          {JSON.stringify(log.metadata, null, 2).substring(0, 200)}
                          {JSON.stringify(log.metadata, null, 2).length > 200 ? '...' : ''}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors text-neutral-400 hover:text-orange-400 ml-4">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Log Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Actions Breakdown */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">ACTIONS BREAKDOWN</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(
                mockLogs.reduce(
                  (acc, log) => {
                    acc[log.action] = (acc[log.action] || 0) + 1
                    return acc
                  },
                  {} as Record<string, number>
                )
              ).map(([action, count]) => (
                <div key={action} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-sm text-neutral-300">{action}</span>
                  <span className="font-bold text-orange-400">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Admins Activity */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">MOST ACTIVE ADMINS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(
                mockLogs.reduce(
                  (acc, log) => {
                    acc[log.actor] = (acc[log.actor] || 0) + 1
                    return acc
                  },
                  {} as Record<string, number>
                )
              )
                .sort(([, a], [, b]) => b - a)
                .map(([actor, count]) => (
                  <div key={actor} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                    <span className="text-sm text-neutral-300 truncate">{actor}</span>
                    <span className="font-bold text-green-400">{count} actions</span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Export Logs */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Logs (CSV)
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
