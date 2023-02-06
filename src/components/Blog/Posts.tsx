import { FC, useEffect } from 'react'
import { Posts, PostContent } from '@/types/main'
import { tech } from './tech'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/posts.module.css'

let deepPosts: PostContent[] = []
let isLink = false
const Posts: FC<Posts> = ({ posts, onChange }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      isLink = true
    }
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  if (isLink) {
    isLink = false
    tech.forEach((item, idx) => (idx === 0 ? (item.selected = true) : (item.selected = false)))
  }

  const handleTech = (name: string, idx: number) => {
    // 选中高亮
    setHeighlight(idx)
    // 过滤文章
    filterArticle(name)
  }

  const setHeighlight = (idx: number) => {
    tech.forEach((item, itemIdx) =>
      itemIdx === idx ? (item.selected = true) : (item.selected = false)
    )
  }

  const filterArticle = (name: string) => {
    if (deepPosts.length === 0) {
      deepPosts = Array.prototype.slice.call(posts).map(item => {
        return {
          ...item,
          tech: item.tech.toLowerCase()
        }
      })
    }

    if (name === 'All') {
      onChange(deepPosts)
      return
    }

    const targetName = name.toLowerCase()
    const renderTarget = deepPosts.filter(item => item.tech === targetName)

    onChange(renderTarget)
  }

  const getNowYear = (date: string) => {
    return new Date(date).getFullYear()
  }

  const isSameYear = (a: string, b: string) => {
    return a && b && getNowYear(a) === getNowYear(b)
  }

  return (
    <article>
      <div className={styles.article}>
        <div>
          {tech.map((item, idx) => (
            <a
              className={`${styles.tech} ${item.selected ? styles.selected : ''}`}
              key={item.name}
              onClick={() => handleTech(item.name, idx)}
            >
              {item.name}
            </a>
          ))}
        </div>
        <ul className={styles.list}>
          {posts.map((item, idx) => (
            <div key={item.id}>
              {!isSameYear(item.date, posts[idx - 1]?.date) ? (
                <p className={styles.date}>{getNowYear(item.date)}</p>
              ) : (
                ''
              )}

              <li className={styles.item}>
                <Link className={styles.link} href={`/blog/${item.id}`}>
                  <div className={styles.name}>{item.title}</div>
                  <div className={styles.time}>
                    {item.date} · {item.readtime}
                  </div>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default Posts
