'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { mockReports } from '@/lib/mock-data'
import { Download, FileText, Calendar, User } from 'lucide-react'

export default function ReportsPage() {
  const reportTypeColors: Record<string, string> = {
    revenue: 'bg-green-900/20 border-green-700 text-green-300',
    orders: 'bg-blue-900/20 border-blue-700 text-blue-300',
    activation: 'bg-orange-900/20 border-orange-700 text-orange-300',
    users: 'bg-purple-900/20 border-purple-700 text-purple-300',
    payments: 'bg-cyan-900/20 border-cyan-700 text-cyan-300',
  }

  const reportTypeIcons: Record<string, JSX.Element> = {
    revenue: <FileText className="w-4 h-4" />,
    orders: <FileText className="w-4 h-4" />,
    activation: <FileText className="w-4 h-4" />,
    users: <FileText className="w-4 h-4" />,
    payments: <FileText className="w-4 h-4" />,
  }

  return (
    <DashboardLayout currentPage="reports">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">REPORTS & ANALYTICS</h1>
          <p className="text-sm text-neutral-400 mt-1">Generate and download business reports</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {['Revenue', 'Orders', 'Activation', 'Users', 'Payments'].map((type) => (
            <button
              key={type}
              className="p-4 bg-neutral-900 border border-neutral-700 rounded hover:border-orange-500 transition-colors text-left group"
            >
              <div className="text-sm font-medium text-neutral-300 group-hover:text-orange-400 transition-colors">
                {type} Report
              </div>
              <div className="text-xs text-neutral-500 mt-2">Generate new</div>
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">RECENT REPORTS</h2>
            <button className="px-4 py-2 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 transition-colors">
              Generate New Report
            </button>
          </div>

          <div className="space-y-3">
            {mockReports.map((report) => (
              <Card key={report.id} className="bg-neutral-900 border-neutral-700 hover:border-neutral-600 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase border ${reportTypeColors[report.type]}`}>
                          {report.type}
                        </span>
                        <span className="text-xs text-neutral-500 capitalize">{report.period}</span>
                      </div>
                      <h3 className="text-sm font-medium text-white mb-1">{report.title}</h3>
                      <p className="text-xs text-neutral-400 mb-3">{report.description}</p>

                      {/* Key Metrics Preview */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                        {Object.entries(report.metrics).slice(0, 5).map(([key, value]) => (
                          <div key={key} className="bg-neutral-800 p-2 rounded">
                            <div className="text-xs text-neutral-500 capitalize">{key.replace(/_/g, ' ')}</div>
                            <div className="text-sm font-bold text-orange-400">{value.toString().substring(0, 20)}</div>
                          </div>
                        ))}
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {report.startDate.toLocaleDateString()} to {report.endDate.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {report.generatedBy}
                        </div>
                        <div className="text-neutral-600">
                          Generated: {report.generatedAt.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors text-neutral-400 hover:text-orange-400">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Report Templates */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">AVAILABLE REPORT TEMPLATES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Revenue Summary',
                  description: 'Total revenue, growth rate, top products',
                  frequency: 'Daily, Weekly, Monthly',
                },
                {
                  name: 'Order Analysis',
                  description: 'Order volume, status breakdown, trends',
                  frequency: 'Daily, Weekly, Monthly',
                },
                {
                  name: 'Activation Performance',
                  description: 'Success rates, failure analysis, processing times',
                  frequency: 'Real-time, Daily, Weekly',
                },
                {
                  name: 'User Growth',
                  description: 'New users, active users, engagement metrics',
                  frequency: 'Weekly, Monthly',
                },
                {
                  name: 'Payment Reconciliation',
                  description: 'Payment status, method breakdown, disputes',
                  frequency: 'Daily, Weekly, Monthly',
                },
                {
                  name: 'System Health',
                  description: 'API uptime, error rates, performance metrics',
                  frequency: 'Real-time, Hourly, Daily',
                },
              ].map((template) => (
                <div key={template.name} className="p-4 bg-neutral-800 rounded border border-neutral-700 hover:border-orange-500 transition-colors cursor-pointer">
                  <h3 className="text-sm font-medium text-white mb-2">{template.name}</h3>
                  <p className="text-xs text-neutral-400 mb-3">{template.description}</p>
                  <div className="text-xs text-neutral-500">Frequency: {template.frequency}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Reports */}
        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">SCHEDULED REPORTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Daily Revenue Summary', schedule: 'Every day at 09:00 UTC', recipients: 'finance@company.com' },
                { name: 'Weekly Activation Report', schedule: 'Every Monday at 08:00 UTC', recipients: 'ops-team@company.com' },
                { name: 'Monthly Business Report', schedule: 'First day of month at 06:00 UTC', recipients: 'ceo@company.com, finance@company.com' },
              ].map((scheduled, idx) => (
                <div key={idx} className="p-3 bg-neutral-800 rounded border border-neutral-700 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{scheduled.name}</div>
                    <div className="text-xs text-neutral-500 mt-1">
                      {scheduled.schedule} → {scheduled.recipients}
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-neutral-700 hover:bg-neutral-600 text-neutral-300 rounded transition-colors">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
