'use client'
import { usePathname } from 'next/navigation'
import { createContext, useMemo } from "react"
import Badge from '@/components/badge'
import { cn } from "@/util/merge"
import { getPosts, type PostsProps } from '@/util/post'
import Link from 'next/link'
import type { PropsWithChildren } from "react"
import type { BlogType } from '@/types/main'

type Category = {
  name: string;
  link: string;
  type: BlogType;
  tag?: boolean;
}

const postsBlog = getPosts('posts')
const postsMemoirs = getPosts('memoirs')
export const PostsContext = createContext<{ posts: PostsProps[] | null }>({
  posts: null
})

function PostsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const posts = useMemo<PostsProps[]>(() => pathname === '/posts/' ? postsBlog : postsMemoirs, [pathname])
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
  const categoryRenderPage = useMemo(() => ['/posts/', '/memoirs/'].includes(pathname), [pathname])

  const isSelected = (link: string) => pathname === `${link}/`

  return (
    <PostsContext.Provider value={{ posts }}>
      {categoryRenderPage ? (
        <div className="flex items-center	gap-3 md:gap-5 md:mb-5">
          {
            categories.map((item) => (
              <Link
                href={item.link}
                onTouchStart={(e) => e.currentTarget.click()}
                className="relative flex"
                key={item.name}
              >
                <span
                  className={
                    cn(
                      'relative z-20 text-xl md:text-3xl hover:text-hover cursor-pointer font-[500] transition-all',
                      isSelected(item.link) ? 'text-hover' : 'text-muted'
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
      ) : null}
      {children}
    </PostsContext.Provider>
  )
}

export default PostsLayout