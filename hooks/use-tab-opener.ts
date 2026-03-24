import { useTabs } from '@/components/dashboard/tabs-context'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useTabOpener() {
  const router = useRouter()
  const pathname = usePathname()
  const { addTab } = useTabs()

  const getTabId = useCallback((type: string, url: string) => {
    const normalizedUrl = url === '/' ? 'root' : url.replace(/^\/+/, '').replace(/\//g, '-')
    return `${type}-${normalizedUrl}`
  }, [])

  const openTab = useCallback(
    (title: string, url: string, type: 'order' | 'user' | 'product' | 'coupon' | 'payment' | 'feedback' | 'report' | 'dashboard' | 'module') => {
      const tabId = getTabId(type, url)
      router.prefetch(url)
      addTab({
        id: tabId,
        title,
        type,
        url,
      })
      if (pathname !== url) {
        router.push(url)
      }
    },
    [addTab, router, pathname, getTabId]
  )

  return { openTab }
}
