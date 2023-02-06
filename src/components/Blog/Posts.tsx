import { FC } from 'react'
import { Posts, PostContent } from '@/types/main'
import { tech } from './tech'
import Link from 'next/link'
import styles from '@/styles/posts.module.css'

let newTech: PostContent[] = []
const Posts: FC<Posts> = ({ posts, onChange }) => {
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
          {posts.map(item => (
            <li className={styles.item} key={item.id}>
              <Link className={styles.link} href={`/blog/${item.id}`}>
                <div className={styles.name}>{item.title}</div>
                <div className={styles.time}>
                  {item.date} · {item.readtime}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default Posts
