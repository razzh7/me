import readTime from '@/util/readtime'
import dayjs from 'dayjs'
import { posts, Post } from '#velite'

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

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getSpecialPost({ params })

  return {
    title: post?.title
  }
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export function getSpecialPost({ params }: PostPageProps) {
  return posts.find((post: Post) => post.slug === params.slug)
}

const _cache: PostsProps[] = []

export const getAllSortedPosts = () => {
  if (!_cache.length) {
    posts.forEach((post: Post) => {
      const { readtime, words } = readTime(post.body)
      const mouthDay = dayjs(post.date).format('MMM D')
      const year = dayjs(post.date).format('YYYY')
      const updatedTime = post?.updatedTime ? dayjs(post.updatedTime).format('YYYY MMM D') : ''

      _cache.push({
        ...post,
        id: post.slug,
        year,
        mouthDay,
        updatedTime,
        readtime,
        words
      })
    })

    _cache.sort(({ date: a }, { date: b }) => {
      const timeA = new Date(a)
      const timeB = new Date(b)
      return timeB.getTime() - timeA.getTime()
    })
  }

  return _cache
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

