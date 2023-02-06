import { FC, useState } from 'react'
import { getAllSortedPosts } from '@/util/post'
import { Posts } from '@/types/main'
import Wrapper from '@/components/Wrapper'
import PostsList from '@/components/Blog/Posts'
import Head from 'next/head'

const PostList: FC<Posts> = ({ posts: statePosts }) => {
  const [posts, setPosts] = useState(statePosts)
  const handleTech = (newPosts: any) => {
    setPosts(newPosts)
  }

  return (
    <Wrapper>
      <Head>
        <title>文章</title>
      </Head>
      <PostsList posts={posts} onChange={handleTech} />
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
