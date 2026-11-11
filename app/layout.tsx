import { PropsWithChildren } from 'react'
import { Inter, Source_Serif_4 } from 'next/font/google'
import Layout from '@/components/layout'
import type { Metadata, Viewport } from 'next'
import { NavigationTracker, BaiduAnlaysisScript } from '@/components/layout/baidu-anlaysis'
import '@/styles/global.css'
import '@/styles/scrollbar.css'
import '@/styles/mdx.css'


export const metadata: Metadata = {
  title: 'Razzh Blog',
  description: 'Razzh Blog',
  applicationName: 'razzh personal blog',
  authors: {
    url: 'https://github.com/razzh7',
    name: 'razzh7'
  },
  icons: {
    icon: { url: '/logo.svg?v=razzh', type: 'image/svg+xml', sizes: 'any' }
  },
  generator: 'react nextjs blog',
  keywords: "blog,razzh,razzh blog,xiaohao,xiaohao's blog,Xiaohao's Blog,小豪的博客"
}

export const viewport: Viewport = {
  themeColor: 'black'
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// Reading face for both themes. Source Serif 4 is OFL and loaded by next/font (not committed).
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
  fallback: ['Georgia', 'Palatino Linotype', 'Palatino']
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning={true}>
        <Layout>
          {children}
        </Layout>
        <NavigationTracker />
      </body>
      <BaiduAnlaysisScript />
    </html>
  )
}
