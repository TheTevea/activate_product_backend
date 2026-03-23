import { OrderStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: OrderStatus | string
  size?: 'sm' | 'md'
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending_payment: { bg: 'bg-yellow-900', text: 'text-yellow-300' },
  paid: { bg: 'bg-blue-900', text: 'text-blue-300' },
  queued: { bg: 'bg-purple-900', text: 'text-purple-300' },
  processing: { bg: 'bg-orange-900', text: 'text-orange-300' },
  activated: { bg: 'bg-green-900', text: 'text-green-300' },
  failed: { bg: 'bg-red-900', text: 'text-red-300' },
  manual_review: { bg: 'bg-neutral-700', text: 'text-neutral-300' },
  cancelled: { bg: 'bg-gray-700', text: 'text-gray-300' },
  active: { bg: 'bg-green-900', text: 'text-green-300' },
  blocked: { bg: 'bg-red-900', text: 'text-red-300' },
  inactive: { bg: 'bg-neutral-700', text: 'text-neutral-300' },
  pending: { bg: 'bg-yellow-900', text: 'text-yellow-300' },
  success: { bg: 'bg-green-900', text: 'text-green-300' },
  paid_not_activated: { bg: 'bg-yellow-900', text: 'text-yellow-300' },
  revoked: { bg: 'bg-red-900', text: 'text-red-300' },
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const colors = statusColors[status] || { bg: 'bg-neutral-700', text: 'text-neutral-300' }
  const displayStatus = status.replace(/_/g, ' ')
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'

  return (
    <div className={`${colors.bg} ${colors.text} rounded inline-block font-medium capitalize ${sizeClass}`}>
      {displayStatus}
    </div>
  )
}
