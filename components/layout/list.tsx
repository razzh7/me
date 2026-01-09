'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { cn } from "@/util/merge"
import styles from '@/styles/posts.module.css'
import { AiBilibiliOutlined as BIcon } from '@twistify/react-icons/ai'
import PostsTabs from '@/components/posts-tabs'
import type { CSSProperties, ReactNode } from 'react'
import type { PostsProps } from '@/util/post'
import type { BlogType } from '@/types/main'
import { animatedCache } from '@/util/animation-cache'

interface PageLinkProps {
  item: PostsProps
  children: ReactNode
}

interface ListLayoutProps {
  type: BlogType
  posts: PostsProps[]
}

function ListLayout(props: ListLayoutProps) {
  const { posts, type } = props
  const link = type === 'posts' ? 'posts' : 'memoirs'

  const hasAnimated = animatedCache.has(type)

  useEffect(() => {
    animatedCache.add(type)
  }, [type])

  const getNowYear = (date: string) => new Date(date).getFullYear()
  const isSameYear = (a: string, b: string) => a && b && getNowYear(a) === getNowYear(b)

  const PageLink = (props: PageLinkProps) => {
    const { item } = props

    if (item.link) {
      return (
        <a
          href={item.link}
          className="group md:flex items-center gap-2 cursor-pointer"
          target='_blank'>
          {props.children}
        </a>
      )
    }

    return (
      <Link
        href={`/${link}/${item.id}`}
        className="group md:flex items-center gap-2 cursor-pointer">
        {props.children}
      </Link>
    )
  }

  return (
    <>
      <PostsTabs type={type} />
      <div>
        <ul>
          {
            posts && posts.map((item: PostsProps, idx: number) => (
              <div key={item.id}>
                {
                  !isSameYear(item.date, posts[idx - 1]?.date)
                    ? (
                      <div
                        className={cn("relative h-16 md:h-20", !hasAnimated && "slide-enter")}
                        style={{ '--enter-stage': idx - 2 } as CSSProperties}
                      >
                        <p className={cn('absolute -z-10 top-6 -left-10', styles.posts)}>{getNowYear(item.date)}</p>
                      </div>
                    )
                    : null
                }
                <li
                  className={cn("mb-5", !hasAnimated && "slide-enter")}
                  style={{ '--enter-stage': idx + 1 } as CSSProperties}
                >
                  <PageLink item={item}>
                    <div className="text-lg md:text-xl text-primary mb-1 group-hover:text-secondary transition-all">{item.title}</div>
                    <div className="text-sm md:text-base text-muted group-hover:text-hover transition-all">
                      <span className='flex gap-1'>
                        {item.mouthDay} · {item.link ? (
                          <i className='flex justify-items-center items-center'>
                            <BIcon size={20} />
                          </i>
                        ) : item.readtime}
                      </span>
                    </div>
                  </PageLink>
                </li>
              </div>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default ListLayout