'use client'
import Navbar from './navbar'
import Plum from './plum'
import { ThemeProvider } from '@/components/theme-provider'
import BackTop from '@/components/back-top'
import { Analytics } from '@/components/analytics'
import { type FC, type PropsWithChildren } from 'react'
import AppProgressBar from '@/components/progress-bar'
import { RecordsCode } from '@/components/records-code'

const Layout: FC<PropsWithChildren> = ({ children }) => (
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

export default Layout
