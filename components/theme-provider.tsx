'use client'
import { useState, useRef, createContext, type PropsWithChildren } from "react"
import { flushSync } from 'react-dom'

type theme = 'dark' | 'light'
interface Context {
  theme: theme
  toggleTheme: () => void
}
export const ThemeContext = createContext<Context>({
  theme: 'dark',
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<theme>('dark')
  const switching = useRef(false)

  const toggleTheme = () => {
    // Do not interrupt an in-flight snapshot/animation on repeated clicks.
    if (switching.current) return

    const root = document.documentElement
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark'
    const updateTheme = () => {
      // Commit both CSS and React consumers before the new snapshot is taken.
      root.classList.toggle('light', nextTheme === 'light')
      root.classList.toggle('dark', nextTheme === 'dark')
      flushSync(() => setTheme(nextTheme))
    }
    const finish = () => {
      root.classList.remove('theme-switching')
      switching.current = false
    }

    switching.current = true
    root.classList.add('theme-switching')

    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      updateTheme()
      // Resolve the final styles before restoring ordinary hover transitions.
      window.getComputedStyle(root).backgroundColor
      finish()
      return
    }

    try {
      const transition = document.startViewTransition(updateTheme)
      // A hidden document or skipped animation may reject ready; the update
      // still runs, and finished releases the lock even when animation is skipped.
      transition.ready.catch(() => {})
      transition.finished.then(finish, finish)
    } catch {
      updateTheme()
      window.getComputedStyle(root).backgroundColor
      finish()
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
