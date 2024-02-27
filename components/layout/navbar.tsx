import Link from 'next/link'
import ThemeButton from './theme-button'
import { AiGithubFilled } from '@twist-space/react-icons/ai'
import { useTheme } from '@/hooks/useTheme'
import { MiRainyLight, MiArticleOutline } from '@twist-space/react-icons/mi'
import { SoLightbulbMinimalisticOutline } from '@twist-space/react-icons/so'
import { TaBrandBooking } from '@twist-space/react-icons/ta'

function Navbar() {
  const { theme, toggleTheme, darkColor, lightColor } = useTheme()

  return (
    <header className="flex justify-between p-4 md:p-8">
      <Link href="/">
        {
          theme === 'dark'
            ? <MiRainyLight size={40} color={darkColor} />
            : <MiRainyLight size={40} color={lightColor} />
        }
      </Link>

      <nav className="flex items-center gap-5 text-primary font-[500]">
        {/* PC */}
        <Link className="hidden md:block hover:text-hover" href="/">
          Me
        </Link>
        <Link className="hidden md:block hover:text-hover" href="/posts">
          Blog
        </Link>
        <Link className="hidden md:block hover:text-hover" href="/projects">
          Projects
        </Link>
        <Link className="hidden md:block hover:text-hover" href="/books">
          Books
        </Link>
        {/* Mobile */}
        <Link className="block md:hidden" href="/posts">
          <MiArticleOutline size={20} />
        </Link>
        <Link className="block md:hidden" href="/projects">
          <SoLightbulbMinimalisticOutline size={20} />
        </Link>
        <Link className="block md:hidden" href="/books">
          <TaBrandBooking size={20} />
        </Link>
        {/* Universal */}
        <a className="hover:text-hover" href="https://github.com/razzh7" target="_blank" rel="noreferrer">
          <AiGithubFilled size={20} />
        </a>
        <ThemeButton
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </nav>
    </header>
  )
}

export default Navbar
