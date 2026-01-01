import readTime from '@/util/readtime'
import dayjs from 'dayjs'
import { posts, memoirs, Post, Memoirs } from '#velite'
import type { BlogType } from '@/types/main'

export type PostsProps = {
  id: string
  year: string
  mouthDay: string
  readtime: string
  updatedTime: string
  words: string
} & Post

export interface PostPageProps {
  params: {
    slug: string
  }
}

export function getSpecialPost({ params }: PostPageProps) {
  return posts.find((post: Post) => post.slug === params.slug && post.publish)
}

export function getSpecialMemoirs({ params }: PostPageProps) {
  return memoirs.find((memoir: Memoirs) => memoir.slug === params.slug && memoir.publish)
}

export const getPosts = (type: BlogType) => {
  const pagePosts: PostsProps[] = []
  const targetPosts = type === 'posts' ? posts : memoirs

  targetPosts.forEach((post: Post) => {
    const { readtime, words } = readTime(post.body)
    const mouthDay = dayjs(post.date).format('MMM D')
    const year = dayjs(post.date).format('YYYY')
    const updatedTime = post?.updatedTime ? dayjs(post.updatedTime).format('YYYY MMM D') : ''

    pagePosts.push({
      ...post,
      id: post.slug,
      year,
      mouthDay,
      updatedTime,
      readtime,
      words
    })
  })

  pagePosts.sort(({ date: a }, { date: b }) => {
    const timeA = new Date(a)
    const timeB = new Date(b)
    return timeB.getTime() - timeA.getTime()
  })

  return pagePosts.filter((post) => post.publish)
}

export const postTimeHandler = (post: Post) => {
  const { readtime } = readTime(post.body)
  const mouthDay = dayjs(post.date).format('MMM D')
  const updatedTime = post?.updatedTime ? dayjs(post.updatedTime).format('YYYY MMM D') : ''

  return {
    readtime,
    mouthDay,
    updatedTime,
    preview: post.preview
  }
}

