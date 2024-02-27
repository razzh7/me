import Footer from '@/components/layout/footer'
import { type PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts - Razzh Blog'
}

const PostsLayout = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    {children}
    <Footer className="my-6 text-start" />
  </div>
)

export default PostsLayout