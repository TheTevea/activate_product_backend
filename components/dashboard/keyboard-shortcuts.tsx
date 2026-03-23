'use client'

import { useEffect } from 'react'
import { useTabs } from './tabs-context'
import { useRouter } from 'next/navigation'

export function KeyboardShortcuts() {
  const { tabs, activeTabId, closeTab, closeAllTabs, setActiveTab } = useTabs()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // Ctrl/Cmd+W: Close current tab
      if (modifier && e.key === 'w' && !e.shiftKey) {
        e.preventDefault()
        if (activeTabId) {
          closeTab(activeTabId)
        }
      }

      // Ctrl/Cmd+Shift+W: Close all tabs
      if (modifier && e.shiftKey && e.key === 'W') {
        e.preventDefault()
        closeAllTabs()
        router.push('/')
      }

      // Ctrl/Cmd+Tab: Switch to next tab
      if (modifier && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        const currentIndex = tabs.findIndex(t => t.id === activeTabId)
        if (currentIndex >= 0) {
          const nextIndex = (currentIndex + 1) % tabs.length
          const nextTab = tabs[nextIndex]
          if (nextTab) {
            setActiveTab(nextTab.id)
            router.push(nextTab.url)
          }
        }
      }

      // Ctrl/Cmd+Shift+Tab: Switch to previous tab
      if (modifier && e.shiftKey && e.key === 'Tab') {
        e.preventDefault()
        const currentIndex = tabs.findIndex(t => t.id === activeTabId)
        if (currentIndex >= 0) {
          const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
          const prevTab = tabs[prevIndex]
          if (prevTab) {
            setActiveTab(prevTab.id)
            router.push(prevTab.url)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [tabs, activeTabId, closeTab, closeAllTabs, setActiveTab, router])

  return null
}
