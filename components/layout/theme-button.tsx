import { TiModeDark, TiSunny } from '@twistify/react-icons/ti'
import { useTheme } from '@/hooks/useTheme'

function ThemeButton() {
  const { theme, toggleTheme } = useTheme()
  return theme === 'dark'
    ? (
      <span
        className="cursor-pointer hover:text-hover2 transition-all"
        onClick={() => toggleTheme()}
        title='Toggle Color Scheme'
      >
        <TiModeDark size={20} />
      </span>
    ) : (
      <span
        className="cursor-pointer hover:text-hover2 transition-all"
        onClick={() => toggleTheme()}
        title='Toggle Color Scheme'
      >
        <TiSunny size={20} />
      </span>
    )
}

export default ThemeButton
