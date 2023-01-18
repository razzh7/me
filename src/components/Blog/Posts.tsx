import { FC } from 'react'
import { Posts } from '@/types/main'
import Link from 'next/link'
import styles from '@/styles/posts.module.css'

const Posts: FC<Posts> = ({ posts }) => {
  console.log('post', posts)

  return (
    <ul>
      {posts.map(item => (
        <li className={styles.item} key={item.id}>
          <Link href={`/blog/${item.id}`}>
            <div className={styles.name}>{item.id}</div>
            <div className={styles.time}>
              {item.date} · {item.readtime}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
