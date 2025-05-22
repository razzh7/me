"use clinet"
import Script from "next/script"
import { useEffect, useState } from "react"

export function LaAnlaysis() {
  const [isVercelUrl, setIsVercelUrl] = useState(false)

  useEffect(() => {
    if (window.location.href.includes('vercel.app')) {
      setIsVercelUrl(true)
    }
  }, [])

  return process.env.NODE_ENV === 'production' && !isVercelUrl ? (
    <Script
      id='51la-analysis'
      strategy='lazyOnload'
      dangerouslySetInnerHTML={{
        __html: `(function() {
var hm = document.createElement("script");
hm.src = "https://js.users.51.la/21961991.js";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);
})();
    `
      }}
    />
  ) : null
}