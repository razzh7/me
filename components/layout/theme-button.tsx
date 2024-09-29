import { TiModeDark, TiSunny } from '@twist-space/react-icons/ti'

interface ThemeButton {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

function ThemeButton ({ theme, toggleTheme }: ThemeButton) {
  return theme === 'dark'
    ? (
      <span className="cursor-pointer hover:text-hover2 transition-all" onClick={() => toggleTheme()}>
        <TiModeDark size={20} />
      </span>
    ) : (
      <span className="cursor-pointer hover:text-hover2 transition-all" onClick={() => toggleTheme()}>
        <TiSunny size={20} />
      </span>
    )
}

export default ThemeButton
