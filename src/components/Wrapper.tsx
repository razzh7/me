import styles from '@/styles/wrapper.module.css'
import { FC, PropsWithChildren } from 'react'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default Wrapper
