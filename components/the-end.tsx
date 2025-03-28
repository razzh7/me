'use client'
import { ThemeContext } from "./theme-provider"
import { useContext } from "react"

function TheEnd() {
  const { theme } = useContext(ThemeContext)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="block mt-2"
      src={theme === 'dark' ? '/the-end-light.svg' : '/the-end-dark.svg'}
      alt="the end"
      width={120}
      height={120}
    />
  )
}

export default TheEnd