import { FiMoon, FiSun } from 'react-icons/fi'
import { FC } from 'react'
import styles from '@/styles/nav.module.css'

interface ThemeButton {
  className: string
  theme: string
  setTheme: Function
}

const ThemeButton: FC<ThemeButton> = ({ className, theme, setTheme }) => {
  const handleClick = () => {
    setTheme((prev: string) => (prev === 'light' ? 'dark' : 'light'))
    localStorage.setItem('theme-xh', theme === 'light' ? 'dark' : 'light')

    if (theme === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }
  // clxs()
  return (
    <>
      <span className={`${theme == 'dark' ? className : styles.blank}`} onClick={handleClick}>
        <FiMoon size={20} />
      </span>
      <span className={`${theme == 'light' ? className : styles.blank}`} onClick={handleClick}>
        <FiSun size={20} />
      </span>
    </>
  )
}

export default ThemeButton
