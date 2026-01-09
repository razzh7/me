'use client'
import Footer from '@/components/layout/footer'
import { type PropsWithChildren } from 'react'

const MemoirsLayout = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    {children}
    <Footer className="my-6 text-start" />
  </div>
)

export default MemoirsLayout