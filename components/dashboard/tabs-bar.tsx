'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { useTabs } from './tabs-context'
import { Button } from '@/components/ui/button'

export function TabsBar() {
  try {
    const router = useRouter()
    const pathname = usePathname()
    const { tabs, activeTabId, closeTab, setActiveTab, closeOtherTabs, closeAllTabs, maxTabs } = useTabs()
    const [contextMenuTab, setContextMenuTab] = useState<string | null>(null)
    const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleContextMenu = (e: React.MouseEvent, tabId: string) => {
      e.preventDefault()
      e.stopPropagation()
      setContextMenuTab(tabId)
      setContextMenuPos({ x: e.clientX, y: e.clientY })
    }

    const handleTabClick = (tabId: string, url: string) => {
      setActiveTab(tabId)
      router.push(url)
    }

    const handleScroll = (direction: 'left' | 'right') => {
      if (!scrollContainerRef.current) return
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }

    const closeContextMenu = () => {
      setContextMenuTab(null)
    }

    // Auto-sync active tab with current pathname
    useEffect(() => {
      const currentTab = tabs.find(t => pathname === t.url || pathname.startsWith(t.url + '/'))
      if (currentTab && currentTab.id !== activeTabId) {
        setActiveTab(currentTab.id)
      }
    }, [pathname, tabs, activeTabId, setActiveTab])

    if (tabs.length === 0) {
      return null
    }

    return (
      <>
        <div
          ref={containerRef}
          className="bg-neutral-800 border-b border-neutral-700 flex items-center h-12 px-2 gap-1 overflow-hidden group"
          onClick={closeContextMenu}
        >
          {/* Close All Button */}
          {tabs.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={closeAllTabs}
              className="h-8 w-8 text-neutral-500 hover:text-red-500 flex-shrink-0 transition-colors"
              title="Close all tabs (Ctrl+Shift+W)"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {/* Divider */}
          <div className="w-px h-6 bg-neutral-700" />

          {/* Scroll Left Button */}
          {tabs.length > 3 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleScroll('left')}
              className="h-8 w-8 text-neutral-500 hover:text-orange-500 flex-shrink-0 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Tabs Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-0.5 overflow-x-auto scrollbar-hide flex-1"
          >
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                onContextMenu={(e) => handleContextMenu(e, tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t border border-b-0 transition-all cursor-pointer group/tab whitespace-nowrap min-w-max ${
                  activeTabId === tab.id
                    ? 'bg-neutral-700 border-neutral-600 text-white shadow-md'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:bg-neutral-750 hover:border-neutral-600 hover:text-neutral-300'
                }`}
                onClick={() => handleTabClick(tab.id, tab.url)}
              >
                {/* Tab Icon/Number */}
                <span
                  className={`text-xs font-semibold ${
                    activeTabId === tab.id ? 'text-orange-500' : 'text-neutral-500 group-hover/tab:text-neutral-400'
                  }`}
                >
                  {index + 1}
                </span>
                
                {/* Tab Title */}
                <span className="text-xs font-medium truncate max-w-[120px]">
                  {tab.title}
                </span>

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  className={`ml-0.5 p-0.5 rounded hover:bg-neutral-600 flex-shrink-0 transition-colors ${
                    activeTabId === tab.id
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 group-hover/tab:text-neutral-400'
                  }`}
                  title="Close tab"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          {tabs.length > 3 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleScroll('right')}
              className="h-8 w-8 text-neutral-500 hover:text-orange-500 flex-shrink-0 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {/* Tab Counter Badge */}
          <div className="text-xs text-neutral-400 font-medium flex-shrink-0 ml-1 px-2.5 py-1 bg-neutral-700/50 rounded border border-neutral-600">
            {tabs.length}/{maxTabs}
          </div>
        </div>

        {/* Context Menu */}
        {contextMenuTab && (
          <div
            className="fixed bg-neutral-700 border border-neutral-600 rounded shadow-xl z-50 py-1 min-w-[160px]"
            style={{
              top: `${contextMenuPos.y}px`,
              left: `${contextMenuPos.x}px`,
            }}
          >
            <button
              onClick={() => {
                handleTabClick(contextMenuTab, tabs.find(t => t.id === contextMenuTab)?.url || '/')
                closeContextMenu()
              }}
              className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3 h-3" />
                Reload Tab
              </div>
            </button>
            <div className="border-t border-neutral-600 my-1" />
            <button
              onClick={() => {
                closeOtherTabs(contextMenuTab)
                closeContextMenu()
              }}
              className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-orange-500/20 hover:text-orange-300 transition-colors"
            >
              Close Other Tabs
            </button>
            <button
              onClick={() => {
                closeTab(contextMenuTab)
                closeContextMenu()
              }}
              className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            >
              Close Tab
            </button>
          </div>
        )}

        {/* Fallback overlay to close context menu */}
        {contextMenuTab && (
          <div
            className="fixed inset-0 z-40"
            onClick={closeContextMenu}
          />
        )}

        {/* Hide scrollbar CSS */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .bg-neutral-750 {
            background-color: rgb(26, 26, 26);
          }
        `}</style>
      </>
    )
  } catch (error) {
    console.error('[v0] Error rendering TabsBar:', error)
    return null
  }
}
