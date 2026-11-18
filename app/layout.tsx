import type { CSSProperties, PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import { GeistSerifRegular } from 'geist/font/serif/regular'
import Layout from '@/components/layout'
import type { Metadata, Viewport } from 'next'
import { NavigationTracker, BaiduAnlaysisScript } from '@/components/layout/baidu-anlaysis'
import 'cn-fontsource-source-han-serif-sc-vf/font.css'
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
  themeColor: '#f9f6ef'
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// next/font includes a generic serif fallback, which would claim Chinese glyphs
// before the article's Source Han face. Reuse only the loaded Geist family here.
const articleFont = {
  '--article-latin': GeistSerifRegular.style.fontFamily.split(',')[0]
} as CSSProperties

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" style={articleFont} className={`light ${GeistSerifRegular.variable}`}>
      <body className={inter.variable} suppressHydrationWarning={true}>
        <Layout>
          {children}
        </Layout>
        <NavigationTracker />
      </body>
      <BaiduAnlaysisScript />
    </html>
  )
}
