'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationEvents() {
  const pathname = usePathname()

  useEffect(() => {
    const url = `${pathname}`
    try {
      // @ts-ignore
      if (window) {
        window._hmt.push(['_trackPageview', url])
      }
    } catch (e) {}
  }, [pathname])

  return null
}