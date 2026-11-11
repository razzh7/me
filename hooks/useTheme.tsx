import { useContext } from "react"
import { ThemeContext } from "@/components/theme-provider"

export function useTheme() {
  const { theme, isSwitching, toggleTheme } = useContext(ThemeContext)
  const darkColor = '#ffffff'
  const lightColor = '#D97757'

  return {
    theme,
    isSwitching,
    toggleTheme,
    darkColor,
    lightColor
  }
}
