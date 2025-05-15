'use client'
import Footer from '@/components/layout/footer'
import { type PropsWithChildren } from 'react'
import PostsLayout from '@/components/layout/posts'

const Posts = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    <PostsLayout>
      {children}
    </PostsLayout>
    <Footer className="my-0 mb-3 md:mb-6 md:mt-1 text-start" />
  </div>
)

export default Posts