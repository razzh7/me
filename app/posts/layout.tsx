'use client'
import Footer from '@/components/layout/footer'
import { CategoryProvider } from '@/hooks/useCategory'
import { type PropsWithChildren } from 'react'

const PostsLayout = ({ children }: PropsWithChildren) => (
  <div className="max-w-prose m-auto">
    <CategoryProvider>
      {children}
    </CategoryProvider>
    <Footer className="my-6 text-start" />
  </div>
)

export default PostsLayout