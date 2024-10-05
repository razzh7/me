'use client'
import { useState, useEffect, Fragment, type CSSProperties } from 'react'
import Link from 'next/link'
import styles from '@/styles/posts.module.css'
import { getAllSortedPosts } from '@/util/post'
import clsx from 'clsx'
import type { PostsProps } from '@/util/post'
import { Post } from 'contentlayer/generated'
import { useCategory } from '@/hooks/useCategory'

function PostsList() {
  const { categories, setSelectedCategory } = useCategory()
  const [posts, setPosts] = useState(() =>
    getAllSortedPosts()
      .filter((post: Post) => post.category === 'blog')
  )

  useEffect(() => {
    const selectedCategory = categories.find(cat => cat.selected)
    if (selectedCategory) {
      setPosts(() => getAllSortedPosts().filter((post: Post) => post.category === selectedCategory.type))
    }
  }, [categories])

  const getNowYear = (date: string) => new Date(date).getFullYear()

  const isSameYear = (a: string, b: string) => a && b && getNowYear(a) === getNowYear(b)

  return (
    <Fragment>
      <div className="flex items-center	gap-3 md:gap-5 md:mb-5">
        {
          categories.map((item) => (
            <span
              className={
                clsx(
                  'text-xl md:text-3xl hover:text-hover cursor-pointer font-[500] transition-all',
                  item.selected ? 'text-hover' : 'text-muted'
                )
              }
              key={item.name}
              onClick={() => setSelectedCategory(item.type)}
            >
              {item.name}
            </span>
          ))
        }
      </div>
      <div>
        <ul>
          {
            posts.map((item: PostsProps, idx: number) => (
              <div key={item.id}>
                {
                  !isSameYear(item.date, posts[idx - 1]?.date)
                    ? (
                      <div
                        className="relative h-16 md:h-20 slide-enter"
                        style={{ '--enter-stage': idx - 2 } as CSSProperties}
                      >
                        <p className={clsx('absolute -z-10 top-6 -left-10', styles.posts)}>{getNowYear(item.date)}</p>
                      </div>
                    )
                    : null
                }
                <li
                  className="mb-5 slide-enter"
                  style={{ '--enter-stage': idx + 1 } as CSSProperties}
                >
                  <Link className="group md:flex items-center gap-2 cursor-pointer" href={`/posts/${item.id}`}>
                    <div className="text-lg md:text-xl text-primary mb-1 group-hover:text-secondary transition-all">{item.title}</div>
                    <div className="text-sm md:text-base text-muted group-hover:text-hover transition-all">
                      {item.mouthDay} · {item.readtime}
                    </div>
                  </Link>
                </li>
              </div>
            ))
          }
        </ul>
      </div>
    </Fragment>
  )
}


export default PostsList
