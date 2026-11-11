'use client'
import { useState, useRef, useEffect, createContext, type PropsWithChildren } from "react"
import { flushSync } from 'react-dom'

type theme = 'dark' | 'light'
interface Context {
  theme: theme
  isSwitching: boolean
  toggleTheme: () => void
}
export const ThemeContext = createContext<Context>({
  theme: 'dark',
  isSwitching: false,
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<theme>('dark')
  const [isSwitching, setIsSwitching] = useState(false)
  const switching = useRef(false)
  const lastInput = useRef(-Infinity)
  const finishFrame = useRef<number>()

  useEffect(() => () => {
    if (finishFrame.current !== undefined) cancelAnimationFrame(finishFrame.current)
    document.documentElement.classList.remove('theme-switching')
  }, [])

  const toggleTheme = () => {
    // Treat a rapid click burst as one action, even without an animation.
    const now = performance.now()
    const repeatedInput = now - lastInput.current < 300
    lastInput.current = now
    if (repeatedInput) return

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
      finishFrame.current = undefined
      root.classList.remove('theme-switching')
      switching.current = false
      setIsSwitching(false)
    }
    const finishAfterPaint = () => {
      // `finished` can resolve before the browser removes the snapshot tree.
      // Keep the control locked until the real page has painted between turns.
      finishFrame.current = requestAnimationFrame(() => {
        finishFrame.current = requestAnimationFrame(finish)
      })
    }

    switching.current = true
    setIsSwitching(true)
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
      transition.finished.then(finishAfterPaint, finishAfterPaint)
    } catch {
      updateTheme()
      window.getComputedStyle(root).backgroundColor
      finish()
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, isSwitching, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
