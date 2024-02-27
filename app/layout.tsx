import { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import '@/styles/global.css'
import '@/styles/scrollbar.css'
import '@/styles/mdx.css'
import type { Metadata, Viewport } from 'next'

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
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
