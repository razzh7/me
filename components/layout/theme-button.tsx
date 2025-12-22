import { TiModeDark, TiSunny } from '@twistify/react-icons/ti'

interface ThemeButton {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

function ThemeButton({ theme, toggleTheme }: ThemeButton) {
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
