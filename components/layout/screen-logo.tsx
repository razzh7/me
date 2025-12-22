import { useState, useEffect } from 'react'
import styles from '@/styles/screen-logo.module.css'
import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'

function ScreenLogo() {
  const { theme } = useTheme()
  const [showLogo, setShowLogo] = useState(true)
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    setStartAnimation(true)

    const timer = setTimeout(() => {
      document.documentElement.classList.add('loaded')

      document.body.style.overflow = ''
      setShowLogo(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return showLogo ? (
    <div className={clsx(styles.logo, {
      [styles['fade-out']]: startAnimation,
      [styles['logo-dark']]: theme === 'dark',
      [styles['logo-light']]: theme === 'light'
    })}
    >
      <img src={theme === 'dark' ? '/razzh.svg' : '/razzh-drak.svg'} alt="screen-logo" />
    </div>
  ) : null
}

export default ScreenLogo