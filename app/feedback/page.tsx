'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { mockFeedback } from '@/lib/mock-data'
import { MessageSquare, AlertCircle, CheckCircle, Clock, Eye, Trash2 } from 'lucide-react'

export default function FeedbackPage() {
  const feedbackTypeIcons: Record<string, JSX.Element> = {
    bug: <AlertCircle className="w-4 h-4 text-red-400" />,
    feature: <MessageSquare className="w-4 h-4 text-blue-400" />,
    general: <MessageSquare className="w-4 h-4 text-neutral-400" />,
    performance: <AlertCircle className="w-4 h-4 text-orange-400" />,
  }

  const priorityColors: Record<string, string> = {
    low: 'bg-blue-900/20 border-blue-700 text-blue-300',
    medium: 'bg-yellow-900/20 border-yellow-700 text-yellow-300',
    high: 'bg-red-900/20 border-red-700 text-red-300',
  }

  const feedbackStats = {
    total: mockFeedback.length,
    new: mockFeedback.filter((f) => f.status === 'new').length,
    inProgress: mockFeedback.filter((f) => f.status === 'in_progress').length,
    resolved: mockFeedback.filter((f) => f.status === 'resolved').length,
    closed: mockFeedback.filter((f) => f.status === 'closed').length,
  }

  const statusCounts = {
    new: mockFeedback.filter((f) => f.status === 'new').length,
    in_progress: mockFeedback.filter((f) => f.status === 'in_progress').length,
    resolved: mockFeedback.filter((f) => f.status === 'resolved').length,
    closed: mockFeedback.filter((f) => f.status === 'closed').length,
  }

  return (
    <DashboardLayout currentPage="feedback">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">USER FEEDBACK & ISSUES</h1>
          <p className="text-sm text-neutral-400 mt-1">Track and manage user feedback, bug reports, and feature requests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Total Feedback</div>
            <div className="text-2xl font-bold text-white">{feedbackStats.total}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">New</div>
            <div className="text-2xl font-bold text-blue-400">{statusCounts.new}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-orange-400">{statusCounts.in_progress}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Resolved</div>
            <div className="text-2xl font-bold text-green-400">{statusCounts.resolved}</div>
          </div>
          <div className="p-4 bg-neutral-900 border border-neutral-700 rounded">
            <div className="text-sm text-neutral-400 mb-1">Closed</div>
            <div className="text-2xl font-bold text-neutral-400">{statusCounts.closed}</div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">ALL FEEDBACK</h2>
            <div className="flex gap-2">
              <select className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 hover:border-neutral-600 transition-colors">
                <option>All Statuses</option>
                <option>New</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <select className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-sm text-neutral-300 hover:border-neutral-600 transition-colors">
                <option>All Types</option>
                <option>Bug</option>
                <option>Feature</option>
                <option>General</option>
                <option>Performance</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {mockFeedback.map((feedback) => (
              <Card key={feedback.id} className="bg-neutral-900 border-neutral-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-2">
                        {feedbackTypeIcons[feedback.feedbackType]}
                        <span className="text-sm font-medium text-white">{feedback.subject}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[feedback.priority]}`}>
                          {feedback.priority}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            feedback.status === 'new'
                              ? 'bg-blue-900/20 text-blue-300'
                              : feedback.status === 'in_progress'
                                ? 'bg-orange-900/20 text-orange-300'
                                : feedback.status === 'resolved'
                                  ? 'bg-green-900/20 text-green-300'
                                  : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {feedback.status === 'in_progress' ? 'In Progress' : feedback.status}
                        </span>
                      </div>

                      {/* Message */}
                      <p className="text-sm text-neutral-300 mb-3">{feedback.message}</p>

                      {/* Internal Notes */}
                      {feedback.internalNotes && (
                        <div className="p-3 bg-neutral-800 rounded mb-3 border border-neutral-700">
                          <div className="text-xs text-neutral-500 mb-1">Internal Note</div>
                          <div className="text-sm text-neutral-300">{feedback.internalNotes}</div>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-neutral-500">
                        <div>
                          <span className="text-neutral-600">From:</span> {feedback.email}
                        </div>
                        <div>
                          <span className="text-neutral-600">Type:</span> {feedback.feedbackType}
                        </div>
                        <div>
                          <span className="text-neutral-600">Created:</span> {feedback.createdAt.toLocaleDateString()}
                        </div>
                        {feedback.resolvedAt && (
                          <div>
                            <span className="text-neutral-600">Resolved:</span> {feedback.resolvedAt.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 ml-4">
                      <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors text-neutral-400 hover:text-orange-400 text-xs">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded transition-colors text-neutral-400 hover:text-red-400 text-xs">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feedback Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Type */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">FEEDBACK BY TYPE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: 'bug', label: 'Bug Reports', count: mockFeedback.filter((f) => f.feedbackType === 'bug').length, color: 'text-red-400' },
                { type: 'feature', label: 'Feature Requests', count: mockFeedback.filter((f) => f.feedbackType === 'feature').length, color: 'text-blue-400' },
                { type: 'performance', label: 'Performance Issues', count: mockFeedback.filter((f) => f.feedbackType === 'performance').length, color: 'text-orange-400' },
                { type: 'general', label: 'General Feedback', count: mockFeedback.filter((f) => f.feedbackType === 'general').length, color: 'text-neutral-400' },
              ].map((item) => (
                <div key={item.type} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-sm text-neutral-300">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* By Status */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">FEEDBACK BY STATUS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { status: 'new', label: 'New', count: statusCounts.new, color: 'text-blue-400' },
                { status: 'in_progress', label: 'In Progress', count: statusCounts.in_progress, color: 'text-orange-400' },
                { status: 'resolved', label: 'Resolved', count: statusCounts.resolved, color: 'text-green-400' },
                { status: 'closed', label: 'Closed', count: statusCounts.closed, color: 'text-neutral-400' },
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between p-2 bg-neutral-800 rounded">
                  <span className="text-sm text-neutral-300">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
