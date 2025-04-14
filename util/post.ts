import readTime from '@/util/readtime'
import dayjs from 'dayjs'
import { allPosts, Post } from 'contentlayer/generated'

export interface PostsProps extends Post {
  id: string
  year: string
  mouthDay: string
  readtime: string
  updatedTime: string
  words: string
}

const _cache:PostsProps[] = []

export const getAllSortedPosts = () => {
  if (!_cache.length) {
    allPosts.forEach((post: Post) => {
      const { readtime, words } = readTime(post?.body?.code)
      const mouthDay = dayjs(post?.date).format('MMM D')
      const year = dayjs(post?.date).format('YYYY')
      const updatedTime = post?.updatedTime ? dayjs(post.updatedTime).format('YYYY MMM D') : ''

      _cache.push({
        ...post,
        id: post?._raw?.flattenedPath,
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
  const { readtime } = readTime(post?.body?.code)
  const mouthDay = dayjs(post?.date).format('MMM D')
  const updatedTime = post?.updatedTime ? dayjs(post.updatedTime).format('YYYY MMM D') : ''

  return {
    readtime,
    mouthDay,
    updatedTime,
    preview: post.preview
  }
}

