import { FC } from 'react'
import { getAllSortedPosts } from '@/util/post'
import { Posts } from '@/types/main'
import Wrapper from '@/components/Wrapper'
import PostsList from '@/components/Blog/Posts'
import Head from 'next/head'

const PostList: FC<Posts> = ({ posts }) => {
  return (
    <Wrapper>
      <Head>
        <title>文章</title>
      </Head>
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
