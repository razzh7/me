'use client'
import Footer from '@/components/layout/footer'
import { type PropsWithChildren } from 'react'
import PostsLayout from '@/components/layout/posts'

const MemoirsLayout = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    <PostsLayout>
      {children}
    </PostsLayout>
    <Footer className="my-6 text-start" />
  </div>
)

export default MemoirsLayout