import { useState, useEffect } from 'react'
import styles from '@/styles/screen-logo.module.css'
import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'

const LOGO_SHOWN_KEY = 'razzh-blog-screen-logo-shown'

function ScreenLogo() {
  const { theme } = useTheme()
  const [showLogo, setShowLogo] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem(LOGO_SHOWN_KEY)
    }
    return true
  })
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    if (!showLogo) {
      document.documentElement.classList.add('loaded')
      return
    }

    setStartAnimation(true)

    const timer = setTimeout(() => {
      document.documentElement.classList.add('loaded')
      document.body.style.overflow = ''
      sessionStorage.setItem(LOGO_SHOWN_KEY, 'true')
      setShowLogo(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [showLogo])

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