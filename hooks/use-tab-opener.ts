import { useTabs } from '@/components/dashboard/tabs-context'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useTabOpener() {
  const router = useRouter()
  const { addTab } = useTabs()

  const getTabId = useCallback((type: string, url: string) => {
    const normalizedUrl = url === '/' ? 'root' : url.replace(/^\/+/, '').replace(/\//g, '-')
    return `${type}-${normalizedUrl}`
  }, [])

  const openTab = useCallback(
    (title: string, url: string, type: 'order' | 'user' | 'product' | 'coupon' | 'payment' | 'feedback' | 'report' | 'dashboard' | 'module') => {
      const tabId = getTabId(type, url)
      addTab({
        id: tabId,
        title,
        type,
        url,
      })
      router.push(url)
    },
    [addTab, router, getTabId]
  )

  return { openTab }
}
