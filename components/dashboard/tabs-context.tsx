'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface TabItem {
  id: string
  title: string
  type: 'order' | 'user' | 'product' | 'coupon' | 'payment' | 'feedback' | 'report' | 'dashboard' | 'module'
  url: string
  icon?: string
}

interface TabsContextType {
  tabs: TabItem[]
  activeTabId: string | null
  addTab: (tab: TabItem) => void
  closeTab: (tabId: string) => void
  closeOtherTabs: (tabId: string) => void
  closeAllTabs: () => void
  setActiveTab: (tabId: string) => void
  reorderTabs: (fromIndex: number, toIndex: number) => void
  maxTabs: number
  isLoading: boolean
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)
const STORAGE_KEY = 'dashboard_tabs'

export function TabsProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<TabItem[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const MAX_TABS = 20

  // Load tabs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        setTabs(data.tabs || [])
        setActiveTabId(data.activeTabId || null)
      }
    } catch (error) {
      console.error('[v0] Failed to load tabs from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Persist tabs to localStorage whenever they change
  useEffect(() => {
    if (isLoading) return
    const persistTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            tabs,
            activeTabId,
          })
        )
      } catch (error) {
        console.error('[v0] Failed to save tabs to localStorage:', error)
      }
    }, 120)

    return () => window.clearTimeout(persistTimer)
  }, [tabs, activeTabId, isLoading])

  const addTab = useCallback((newTab: TabItem) => {
    setTabs(prevTabs => {
      // Check if tab already exists
      const existingTab = prevTabs.find(t => t.id === newTab.id)
      if (existingTab) {
        setActiveTabId(newTab.id)
        return prevTabs
      }

      // Check max tabs limit
      if (prevTabs.length >= MAX_TABS) {
        console.warn(`[v0] Max tabs limit (${MAX_TABS}) reached`)
        return prevTabs
      }

      const updatedTabs = [...prevTabs, newTab]
      setActiveTabId(newTab.id)
      return updatedTabs
    })
  }, [])

  const closeTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      const updatedTabs = prevTabs.filter(t => t.id !== tabId)
      
      // If closing active tab, switch to another
      if (activeTabId === tabId) {
        const nextTab = updatedTabs[updatedTabs.length - 1]
        setActiveTabId(nextTab?.id ?? null)
      }
      
      return updatedTabs
    })
  }, [activeTabId])

  const closeOtherTabs = useCallback((tabId: string) => {
    setTabs(prevTabs => prevTabs.filter(t => t.id === tabId))
    setActiveTabId(tabId)
  }, [])

  const closeAllTabs = useCallback(() => {
    setTabs([])
    setActiveTabId(null)
  }, [])

  const reorderTabs = useCallback((fromIndex: number, toIndex: number) => {
    setTabs(prevTabs => {
      if (fromIndex === toIndex) return prevTabs
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= prevTabs.length ||
        toIndex >= prevTabs.length
      ) {
        return prevTabs
      }

      const updatedTabs = [...prevTabs]
      const [movedTab] = updatedTabs.splice(fromIndex, 1)
      if (!movedTab) return prevTabs
      updatedTabs.splice(toIndex, 0, movedTab)
      return updatedTabs
    })
  }, [])

  const setActiveTabSafe = useCallback((tabId: string) => {
    setActiveTabId(prevActiveTabId => {
      if (prevActiveTabId === tabId) return prevActiveTabId
      if (!tabs.some(t => t.id === tabId)) return prevActiveTabId
      return tabId
    })
  }, [tabs])

  return (
    <TabsContext.Provider
      value={{
        tabs,
        activeTabId,
        addTab,
        closeTab,
        closeOtherTabs,
        closeAllTabs,
        setActiveTab: setActiveTabSafe,
        reorderTabs,
        maxTabs: MAX_TABS,
        isLoading,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export function useTabs() {
  const context = useContext(TabsContext)
  if (context === undefined) {
    return {
      tabs: [],
      activeTabId: null,
      addTab: () => {},
      closeTab: () => {},
      closeOtherTabs: () => {},
      closeAllTabs: () => {},
      setActiveTab: () => {},
      reorderTabs: () => {},
      maxTabs: 20,
      isLoading: false,
    }
  }
  return context
}
