import { FC } from 'react'
import { IconType } from 'react-icons'
import styles from '@/styles/projects.module.css'

interface ProjectItem {
  title: string
  description: string
  href: string
  icon: IconType
}
const Item: FC<ProjectItem> = props => {
  const { title, description, href, icon: Icon } = props
  return (
    <a href={href} className={styles.item} target="_blank" rel="noreferrer">
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
