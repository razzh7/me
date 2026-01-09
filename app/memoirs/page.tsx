import ListLayout from "@/components/layout/list"
import { getPosts } from '@/util/post'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Memoirs - Razzh'
}

const memoirs = getPosts('memoirs')

function Memoirs() {
  return (
    <ListLayout type="memoirs" posts={memoirs} />
  )
}

export default Memoirs