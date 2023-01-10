import Navbar from './Navbar/Navbar'
import Plum from './Plum/Plum'
import { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Plum />
      {children}
    </div>
  )
}

export default Layout
