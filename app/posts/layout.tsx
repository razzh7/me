'use client'
import Footer from '@/components/layout/footer'
import { PostProvider } from '@/hooks/usePosts'
import { type PropsWithChildren } from 'react'

const PostsLayout = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    <PostProvider>
      {children}
    </PostProvider>
    <Footer className="my-6 text-start" />
  </div>
)

export default PostsLayout