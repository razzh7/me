'use client'
import Navbar from './navbar'
import Plum from './plum'
import { ThemeProvider } from '@/components/theme-provider'
import BackTop from '@/components/back-top'
import { Analytics } from '@/components/layout/vercel-analytics'
import { type FC, type PropsWithChildren } from 'react'
import AppProgressBar from '@/components/progress-bar'
import { RecordsCode } from '@/components/records-code'
import ScreenLogo from './screen-logo'
import LayoutAplayer from './aplayer'

const Layout: FC<PropsWithChildren> = ({ children }) => (
  (
    <ThemeProvider>
      <Navbar />
      <Plum />
      <main className="px-7 py-10 overflow-x-hidden">
        {children}
        <RecordsCode />
      </main>
      <ScreenLogo />
      <BackTop />
      <Analytics />
      <AppProgressBar />
      <LayoutAplayer />
    </ThemeProvider>
  )
)

export default Layout
