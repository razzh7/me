import Link from 'next/link'
import ThemeButton from './theme-button'
import { AiGithubFilled } from '@twistify/react-icons/ai'
import { MiArticleOutline } from '@twistify/react-icons/mi'
import { SoLightbulbMinimalisticOutline } from '@twistify/react-icons/so'
import { TaBrandBooking } from '@twistify/react-icons/ta'
import { PhButterfly } from '@twistify/react-icons/ph'
import Logo from './logo'

function Navbar() {
  return (
    <header>
      <Link className='w-12 md:w-[72px] h-12 flex items-center absolute xl:fixed m-5 select-none outline-none' href="/" aria-label="Razzh — 首页">
        <Logo />
      </Link>

      <nav className="grid grid-cols-[auto_max-content] w-full px-6 py-8 sm:p-8 box-border">
        <div className='spacer'></div>
        <div className='grid gap-2.5 sm:gap-[1.2rem] grid-flow-col'>
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
          <a className="hover:text-hover2 transition-all" href="https://github.com/razzh7" target="_blank" rel="noreferrer" title='Github'>
            <AiGithubFilled size={20} />
          </a>
          <ThemeButton />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
