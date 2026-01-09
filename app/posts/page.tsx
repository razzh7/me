import ListLayout from '@/components/layout/list'
import { getPosts } from '@/util/post'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Razzh'
}

const posts = getPosts('posts')

function PostsList() {
  return (
    <ListLayout type="posts" posts={posts} />
  )
}


export default PostsList
