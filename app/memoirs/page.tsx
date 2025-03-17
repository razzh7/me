import ListLayout from "@/components/layout/list"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Memoirs - Razzh'
}

function Memoirs() {
  return (
    <ListLayout />
  )
}

export default Memoirs