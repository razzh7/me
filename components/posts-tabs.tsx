'use client'
import { useMemo } from "react"
import Badge from '@/components/badge'
import { cn } from '@/util/merge'
import { animatedCache } from '@/util/animation-cache'
import Link from 'next/link'
import type { BlogType } from '@/types/main'

type Category = {
  name: string;
  link: string;
  type: BlogType;
  tag?: boolean;
}

interface PostsTabsProps {
  type: BlogType
}

function PostsTabs({ type }: PostsTabsProps) {
  const categories = useMemo<Category[]>(() => [
    {
      name: 'Blog',
      link: '/posts',
      type: 'posts'
    },
    {
      name: 'Memoirs',
      link: '/memoirs',
      type: 'memoirs',
      tag: true
    }
  ], [])

  const isSelected = (item: Category) => item.type === type

  return (
    <div className="flex items-center	gap-3 md:gap-5 md:mb-5">
      {
        categories.map((item) => (
          <Link
            href={item.link}
            onClick={() => animatedCache.delete(item.type)}
            onTouchStart={(e) => e.currentTarget.click()}
            className="relative flex"
            key={item.name}
          >
            <span
              className={
                cn(
                  'relative z-20 text-xl md:text-3xl hover:text-hover cursor-pointer font-[500] transition-all',
                  isSelected(item) ? 'text-hover' : 'text-muted'
                )
              }
            >
              {item.name}
            </span>
            {item.tag ? (
              <span className='absolute z-10 md:top-[-0.1rem] top-[-0.3rem] md:right-[-2.65rem] right-[-2.2rem]'>
                <Badge className='md:scale-[.7] scale-50'>
                  生活
                </Badge>
              </span>
            ) : null}
          </Link>
        ))
      }
    </div>
  )
}

export default PostsTabs