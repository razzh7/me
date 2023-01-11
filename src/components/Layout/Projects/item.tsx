import { FC } from 'react'
import { IconType } from 'react-icons'
import styles from '@/styles/projects.module.css'

interface ProjectItem {
  title: string
  description: string
  href: string
  Icon: IconType
}
const Item: FC<ProjectItem> = ({ title, description, href, Icon }) => {
  return (
    <a href={href} className={styles.item} target="_blank">
      <div className={styles.left}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.right}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </a>
  )
}

export default Item
