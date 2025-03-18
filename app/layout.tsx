import { PropsWithChildren, Suspense } from 'react'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import '@/styles/global.css'
import '@/styles/scrollbar.css'
import '@/styles/mdx.css'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { NavigationEvents } from '@/components/navigation-events'

export const metadata: Metadata = {
  title: 'Razzh Blog',
  description: 'Razzh Blog',
  applicationName: 'razzh personal blog',
  authors: {
    url: 'https://github.com/razzh7',
    name: 'razzh7'
  },
  icons: '/favicon.svg',
  generator: 'react nextjs blog',
  keywords: "blog,razzh,razzh blog,xiaohao,xiaohao's blog,Xiaohao's Blog,小豪的博客"
}

export const viewport: Viewport = {
  themeColor: 'black'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Layout>
          {children}
        </Layout>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
      {process.env.NODE_ENV === 'production' ? (
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
      ) : null}
    </html>
  )
}
