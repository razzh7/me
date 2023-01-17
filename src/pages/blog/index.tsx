import { FC } from 'react'
import { getAllSortedPosts } from '@/util/post'
import { Posts } from '@/types/main'
import Wrapper from '@/components/Wrapper'
import PostsList from '@/components/Blog/Posts'

const PostList: FC<Posts> = ({ posts }) => {
  return (
    <Wrapper>
      <PostsList posts={posts} />
    </Wrapper>
  )
}

export default PostList

export const getStaticProps = () => {
  const posts = getAllSortedPosts()
  return {
    props: {
      posts
    }
  }
}
