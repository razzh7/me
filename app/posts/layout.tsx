'use client'
import Footer from '@/components/layout/footer'
import { type PropsWithChildren } from 'react'

const Posts = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    {children}
    <Footer className="my-0 mb-3 md:mb-6 md:mt-1 text-start" />
  </div>
)

export default Posts