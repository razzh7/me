import { TiModeDark, TiSunny } from '@twistify/react-icons/ti'
import { useTheme } from '@/hooks/useTheme'

function ThemeButton() {
  const { theme, isSwitching, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      className="cursor-pointer hover:text-hover2 transition-colors disabled:cursor-default"
      onClick={toggleTheme}
      disabled={isSwitching}
      aria-label="Toggle Color Scheme"
      aria-pressed={theme === 'light'}
      title="Toggle Color Scheme"
    >
      {theme === 'dark' ? <TiModeDark size={20} /> : <TiSunny size={20} />}
    </button>
  )
}

export default ThemeButton
