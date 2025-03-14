'use client'
import { PostsProps } from "@/util/post"
import Link from 'next/link'
import { cn } from "@/util/merge"
import styles from '@/styles/posts.module.css'
import type { CSSProperties } from 'react'
import { AiBilibiliOutlined as BIcon } from '@twistify/react-icons/ai'
import { useContext } from "react"
import { PostsContext } from "@/components/layout/posts"

interface PageLinkProps {
  item: PostsProps
  children: React.ReactNode
}

function ListLayout() {
  const { posts } = useContext(PostsContext)
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
        href={`/posts/${item.id}`}
        className="group md:flex items-center gap-2 cursor-pointer">
        {props.children}
      </Link>
    )
  }

  return (
    <div>
      <ul>
        {
          posts && posts.map((item: PostsProps, idx: number) => (
            <div key={item.id}>
              {
                !isSameYear(item.date, posts[idx - 1]?.date)
                  ? (
                    <div
                      className="relative h-16 md:h-20 slide-enter"
                      style={{ '--enter-stage': idx - 2 } as CSSProperties}
                    >
                      <p className={cn('absolute -z-10 top-6 -left-10', styles.posts)}>{getNowYear(item.date)}</p>
                    </div>
                  )
                  : null
              }
              <li
                className="mb-5 slide-enter"
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
  )
}

export default ListLayout