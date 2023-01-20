import Link from "next/link"
import styles from '@/styles/back.module.css'

const Back = () => {
  return (
    <div className={styles.back} >
      <Link href='/blog'>BACK</Link>
    </div>
  )
}

export default Back