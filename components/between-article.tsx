'use client'
import Link from "next/link"
import { TiChevronLeft, TiChevronRight } from '@twistify/react-icons/ti'

interface ArticleProps {
  name: string;
  url: string;
}
interface BetweenArticleProps {
  next?: ArticleProps
  last?: ArticleProps
}

function BetweenArticle(props: BetweenArticleProps) {
  const { next, last } = props

  return (
    <div className="flex flex-row items-center justify-between mt-8 md:mt-12">
      {last ? (
        <Link
          className='inline-flex items-center justify-center gap-1 border border-border whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-border hover:text-badge h-9 px-4 py-2'
          href={last.url}
        >
          <TiChevronLeft />
          {last.name}
        </Link>
      ): null}
      {next ? (
        <Link
          className='inline-flex items-center justify-center gap-1 border border-border whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-border hover:text-badge h-9 px-4 py-2'
          href={next.url}
        >
          {next.name}
          <TiChevronRight />
        </Link>
      ) : null
      }
    </div>
  )
}

export default BetweenArticle