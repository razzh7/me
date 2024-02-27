'use client'
import { useState, useEffect, createContext, type PropsWithChildren } from "react"

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
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}