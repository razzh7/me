import Link from 'next/link'
import ThemeButton from './ThemeButton'
import clsx from 'clsx'
import { BsGithub } from 'react-icons/bs'
import { FaRegLightbulb } from 'react-icons/fa'
import { MdOutlineArticle } from 'react-icons/md'
import { AiOutlineBook } from 'react-icons/ai'
import { FC } from 'react'
import styles from '@/styles/nav.module.css'
import Image from 'next/image'
import logoDark from '../../../../public/svg/razzh-dark.svg'
import logoLight from '../../../../public/svg/razzh-light.svg'

interface ThemeMode {
  theme: string
  setTheme: Function
}
const Navbar: FC<ThemeMode> = ({ theme, setTheme }) => {
  return (
    <header className={styles.container}>
      <Link href="/">
        <Image src={theme === 'dark' ? logoDark : logoLight} alt='Razzh' width={100} height={28}></Image>
      </Link>

      <nav className={styles.nav}>
        {/* PC、Mobile */}
        <Link href="/">
          <span className={styles.pc}>Me</span>
        </Link>
        <Link href="/blog">
          <span className={styles.pc}>Blog</span>
        </Link>
        <Link href="/projects">
          <span className={styles.pc}>Projects</span>
        </Link>
        <Link href="/books">
          <span className={styles.pc}>Books</span>
        </Link>
        <a href="https://github.com/razzh7" className={clsx(styles.pc, styles.icon)}>
          <BsGithub size={20} />
        </a>
        <ThemeButton className={clsx(styles.pc, styles.icon)} theme={theme} setTheme={setTheme} />

        {/*Mobile*/}
        <Link href="/blog" className={clsx(styles.mobile, styles.icon)}>
          <MdOutlineArticle size={20} />
        </Link>
        <Link href="/projects" className={clsx(styles.mobile, styles.icon)}>
          <FaRegLightbulb size={20} />
        </Link>
        <Link href="/books" className={clsx(styles.mobile, styles.icon)}>
          <AiOutlineBook size={20} />
        </Link>
        <a
          href="https://github.com/rzhAvenir"
          className={clsx(styles.mobile, styles.icon)}
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub size={20} />
        </a>
        <ThemeButton
          className={clsx(styles.mobile, styles.icon)}
          theme={theme}
          setTheme={setTheme}
        />
      </nav>
    </header>
  )
}

export default Navbar
