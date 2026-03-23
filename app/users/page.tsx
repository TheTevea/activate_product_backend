'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DataTable } from '@/components/dashboard/data-table'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button } from '@/components/ui/button'
import { mockUsers } from '@/lib/mock-data'
import { Plus, Eye, Trash2 } from 'lucide-react'
import { useTabs } from '@/components/dashboard/tabs-context'
import { DeleteConfirmationDialog } from '@/components/dashboard/delete-confirmation-dialog'

export default function UsersPage() {
  const { addTab } = useTabs()
  const [users, setUsers] = useState(mockUsers)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<(typeof mockUsers[0]) | null>(null)

  const handleOpenUserTab = (userId: string, userName: string) => {
    addTab({
      id: `user-${userId}`,
      title: userName,
      type: 'user',
      url: `/users/${userId}`,
    })
  }

  const handleDeleteClick = (user: typeof mockUsers[0]) => {
    setUserToDelete(user)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id))
      setUserToDelete(null)
    }
  }

  return (
    <DashboardLayout currentPage="users">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider">USER MANAGEMENT</h1>
            <p className="text-sm text-neutral-400 mt-1">Manage Telegram users and their accounts</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{mockUsers.filter(u => u.status === 'active').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{mockUsers.filter(u => u.status === 'blocked').length}</div>
                <p className="text-xs text-neutral-400 mt-2">Blocked Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900 border-neutral-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{mockUsers.length}</div>
                <p className="text-xs text-neutral-400 mt-2">Total Users</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <DataTable
          title="ALL USERS"
          columns={[
            { key: 'telegramId', label: 'Telegram ID' },
            { key: 'username', label: 'Username' },
            { key: 'firstName', label: 'Name', render: (v, row) => `${v} ${row.lastName || ''}` },
            { key: 'totalOrders', label: 'Orders' },
            { key: 'totalSpending', label: 'Total Spending', render: (v) => `$${v}` },
            {
              key: 'status',
              label: 'Status',
              render: (v) => <StatusBadge status={v} />,
            },
            {
              key: 'registeredAt',
              label: 'Registered',
              render: (v) => new Date(v).toLocaleDateString(),
            },
            {
              key: 'id',
              label: 'Action',
              render: (v, row) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenUserTab(v, `${row.firstName} ${row.lastName}`)}
                    className="inline-flex items-center text-xs text-orange-500 hover:text-orange-400"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
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
          data={users}
          pageSize={10}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          description="This user account will be permanently deleted. All associated orders and data will be removed."
          itemName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : undefined}
        />
      </div>
    </DashboardLayout>
  )
}
