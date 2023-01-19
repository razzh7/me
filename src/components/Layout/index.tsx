import Head from 'next/head'
import Navbar from './Navbar/Navbar'
import Plum from './Plum/Plum'
import Footer from './Footer'
import Wrapper from '../Wrapper'
import { FC, PropsWithChildren, useState, useEffect } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    const preTheme = localStorage.getItem('theme-xh')
    if (preTheme) {
      setTheme(preTheme)
    } else {
      localStorage.setItem('theme-xh', theme)
      setTheme(theme)
    }
  }, [])

  return (
    <div className="layout" theme-mode={theme}>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Navbar theme={theme} setTheme={setTheme} />
      <Plum />
      {children}
      <Wrapper>
        <Footer />
      </Wrapper>
    </div>
  )
}

export default Layout
