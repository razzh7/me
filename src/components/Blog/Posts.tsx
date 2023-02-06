import { FC } from 'react'
import { Posts, PostContent } from '@/types/main'
import { tech } from './tech'
import Link from 'next/link'
import styles from '@/styles/posts.module.css'

let newTech: PostContent[] = []
const Posts: FC<Posts> = ({ posts, onChange }) => {
  // 过滤文章
  const handleTech = (name: string, idx: number) => {
    // 选中高亮
    tech.forEach((item, itemIdx) =>
      itemIdx === idx ? (item.selected = true) : (item.selected = false)
    )
    if (newTech.length === 0) {
      newTech = Array.prototype.slice.call(posts).map(item => {
        return {
          ...item,
          tech: item.tech.toLowerCase()
        }
      })
    }

    if (name === 'All') {
      onChange(newTech)
      return
    }

    const targetName = name.toLowerCase()
    const renderTarget = newTech.filter(item => {
      if (item.tech === targetName) {
        return item
      }
    })

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
