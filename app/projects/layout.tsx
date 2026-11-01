import Footer from '@/components/layout/footer'
import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Razzh'
}

const ProjectLayout = ({ children }: PropsWithChildren) => (
  <main className="mx-auto w-full max-w-[820px] px-8">
    {children}
    <Footer />
  </main>
)

export default ProjectLayout