'use client'
import Navbar from './navbar'
import Plum from './plum'
import { ThemeProvider } from '@/components/theme-provider'
import BackTop from '@/components/back-top'
import { Analytics } from '@/components/analytics'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import AppProgressBar from '@/components/progress-bar'
import { RecordsCode } from '@/components/records-code'
import fastclick from 'fastclick'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    // @ts-expect-error
    fastclick.attach(document.body)
  })

  return (
    (
      <ThemeProvider>
        <Navbar />
        <Plum />
        <main className="px-7 py-10 of-x-hidden">
          {children}
          <RecordsCode />
        </main>
        <BackTop />
        <Analytics />
        <AppProgressBar />
      </ThemeProvider>
    )
  )
}

export default Layout
