import ListLayout from '@/components/layout/list'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Razzh'
}

function PostsList() {
  return (
    <ListLayout />
  )
}


export default PostsList
