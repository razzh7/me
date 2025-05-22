"use client"
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
var la = document.createElement("script");
la.id="LA_COLLECT"
la.charset="UTF-8"
la.src = "https://sdk.51.la/js-sdk-pro.min.js?id=3MFtVbbh1VuMsQ4N&ck=3MFtVbbh1VuMsQ4N";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(la, s);
})();
    `
      }}
    />
  ) : null
}