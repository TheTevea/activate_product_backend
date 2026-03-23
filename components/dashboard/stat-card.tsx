import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  trend?: { value: number; isPositive: boolean }
  icon?: ReactNode
}

export function StatCard({ label, value, subtext, trend, icon }: StatCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs text-neutral-400 tracking-wider uppercase">{label}</p>
          <div className="text-2xl font-bold text-white font-mono mt-1">{value}</div>
        </div>
        {icon && <div className="text-orange-500">{icon}</div>}
      </div>
      {subtext && <p className="text-xs text-neutral-500">{subtext}</p>}
      {trend && (
        <div className={`text-xs mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last period
        </div>
      )}
    </div>
  )
}
