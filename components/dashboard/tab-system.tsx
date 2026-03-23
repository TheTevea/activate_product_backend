'use client'

import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface Tab {
  id: string
  title: string
  href: string
}

interface TabSystemProps {
  tabs: Tab[]
  activeTabId: string | null
  onTabClose: (id: string) => void
  onTabChange: (id: string) => void
  maxTabs?: number
}

export function TabSystem({ 
  tabs, 
  activeTabId, 
  onTabClose, 
  onTabChange,
  maxTabs = 8 
}: TabSystemProps) {
  const isFull = tabs.length >= maxTabs

  return (
    <div className="bg-neutral-800 border-b border-neutral-700 flex items-center gap-1 px-4 py-2 overflow-x-auto">
      {tabs.map((tab) => (
        <Link key={tab.id} href={tab.href}>
          <button
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-t border-b-2 transition-colors whitespace-nowrap text-sm ${
              activeTabId === tab.id
                ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                : 'bg-neutral-700/50 border-neutral-600 text-neutral-400 hover:text-white hover:bg-neutral-600/50'
            }`}
          >
            <span className="max-w-xs truncate">{tab.title}</span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onTabClose(tab.id)
              }}
              className="ml-1 hover:text-red-400 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </button>
        </Link>
      ))}
      
      {!isFull && (
        <button
          className="flex items-center gap-1 px-3 py-1.5 text-neutral-500 hover:text-orange-400 text-sm transition-colors"
          title={`Open new tab (${tabs.length}/${maxTabs})`}
        >
          <Plus className="w-4 h-4" />
        </button>
      )}

      {isFull && (
        <div className="ml-auto text-xs text-neutral-500">
          {tabs.length}/{maxTabs} tabs
        </div>
      )}
    </div>
  )
}
