import Footer from '@/components/layout/footer'
import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects'
}

const ProjectLayout = ({ children }: PropsWithChildren) => (
  <main className="container">
    {children}
    <Footer />
  </main>
)

export default ProjectLayout