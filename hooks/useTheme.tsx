import { useContext } from "react"
import { ThemeContext } from "@/components/theme-provider"

export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const darkColor = '#ffffff'
  const lightColor = '#060606'

  return {
    theme,
    toggleTheme,
    darkColor,
    lightColor
  }
}