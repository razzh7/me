import Link from 'next/link'
import ThemeButton from './theme-button'
import { AiGithubFilled } from '@twistify/react-icons/ai'
import { useTheme } from '@/hooks/useTheme'
import { MiArticleOutline } from '@twistify/react-icons/mi'
import { SoLightbulbMinimalisticOutline } from '@twistify/react-icons/so'
import { TaBrandBooking } from '@twistify/react-icons/ta'
import { PhButterfly } from '@twistify/react-icons/ph'
import Logo from '../faze-logo'

function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex justify-between">
      <Link href="/">
        <Logo className='w-12 h-12 select-none outline-none absolute xl:fixed m-5' theme={theme} />
        {/* {
          theme === 'dark'
            ? <img
              className='w-12 h-12 select-none outline-none absolute xl:fixed m-5'
              src="/faze-light.svg"
              alt="faze logo"
            />
            : <img
              className='w-12 h-12 select-none outline-none absolute xl:fixed m-5'
              src="/faze.svg"
              alt="faze logo"
            />
        } */}
      </Link>

      <nav className="flex items-center gap-5 text-primary font-[500] p-8">
        {/* PC */}
        <Link className="hidden md:block hover:text-hover2 transition-all" href="/" title='Me'>
          Me
        </Link>
        <Link className="hidden md:block hover:text-hover2 transition-all" href="/posts" title='Posts'>
          Blog
        </Link>
        <Link className="hidden md:block hover:text-hover2 transition-all" href="/memoirs" title='Memoirs'>
          Memoirs
        </Link>
        <Link className="hidden md:block hover:text-hover2 transition-all" href="/projects" title='Projects'>
          Projects
        </Link>
        <Link className="hidden md:block hover:text-hover2 transition-all" href="/books" title='Books'>
          Books
        </Link>
        {/* Mobile */}
        <Link className="block md:hidden hover:text-hover2 transition-all" href="/posts" title='Posts'>
          <MiArticleOutline size={20} />
        </Link>
        <Link className="block md:hidden hover:text-hover2 transition-all" href="/memoirs" title='Memoirs'>
          <PhButterfly size={20} />
        </Link>
        <Link className="block md:hidden hover:text-hover2 transition-all" href="/projects" title='Projects'>
          <SoLightbulbMinimalisticOutline size={20} />
        </Link>
        <Link className="block md:hidden hover:text-hover2 transition-all" href="/books" title='Books'>
          <TaBrandBooking size={20} />
        </Link>
        {/* Universal */}
        <a className="hover:text-hover2 transition-all" href="https://github.com/razzh7" target="_blank" rel="noreferrer" title='Github'>
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
