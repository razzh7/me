"use client"
import { NavigationEvents } from '@/components/navigation-events'
import { Suspense, useEffect, useState } from 'react'
import Script from 'next/script'

export function NavigationTracker() {
  return process.env.NODE_ENV === 'production' ? (
    <Suspense fallback={null}>
      <NavigationEvents />
    </Suspense>
  ) : null
}

export function BaiduAnlaysisScript() {
  const [isVercelUrl, setIsVercelUrl] = useState(false)

  useEffect(() => {
    if (window.location.href.includes('vercel.app')) {
      setIsVercelUrl(true)
    }
  }, [])

  return process.env.NODE_ENV === 'production' && !isVercelUrl ? (
    <Script
      id='baidu-analysis'
      strategy='lazyOnload'
      dangerouslySetInnerHTML={{
        __html: `var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?11038a882d198a857410c2ab295a2eff";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);
})();
    `
      }}
    />
  ) : null
}