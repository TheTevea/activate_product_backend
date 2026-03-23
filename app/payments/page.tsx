'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { mockPayments } from '@/lib/mock-data'
import { Download, CheckCircle } from 'lucide-react'

export default function PaymentsPage() {
  return (
    <DashboardLayout currentPage="payments">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">PAYMENT MANAGEMENT</h1>
            <p className="text-sm text-neutral-400 mt-1">Reconcile and manage payment records</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Payment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{mockPayments.length}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Payments</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{mockPayments.filter(p => p.status === 'paid').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{mockPayments.filter(p => p.status === 'pending').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{mockPayments.filter(p => p.status === 'failed').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Failed</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">${mockPayments.reduce((sum, p) => sum + p.amount, 0)}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Amount</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payments Table */}
        <DataTable
          title="ALL PAYMENTS"
          columns={[
            { key: 'id', label: 'Payment ID' },
            { key: 'orderId', label: 'Order ID' },
            { key: 'userId', label: 'User ID', render: (v) => `#${v}` },
            { key: 'method', label: 'Method', render: (v) => <span className="capitalize">{v}</span> },
            { key: 'amount', label: 'Amount', render: (v) => `$${v}` },
            { key: 'transactionReference', label: 'Reference' },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <StatusBadge status={v} />,
            },
            {
              key: 'paidAt',
              label: 'Paid Date',
              render: (v) => v ? new Date(v).toLocaleDateString() : 'Pending',
            },
            {
              key: 'id',
              label: 'Action',
              render: (v) => (
                <Button variant="ghost" size="sm" className="text-xs text-orange-500 hover:text-orange-400">
                  <CheckCircle className="w-3 h-3" />
                </Button>
              ),
            },
          ]}
          data={mockPayments}
          pageSize={10}
        />
      </div>
    </DashboardLayout>
  )
}
