import { useMDXComponent } from 'next-contentlayer/hooks'
import { cn } from '@/util/merge'
import ImagePreview from '@/components/img-preview'
import MdxPre from '@/components/mdx-pre'
import VideoPlayer from './video'
import YouTubeEmbed from './youtube-embed'
import Divider from './divider'
import TwistAPlayer from './twist-aplayer'
import TheEnd from './the-end'
import OutLink from './outlink'
import BetweenArticle from './between-article'

const components = {
  ImagePreview,
  VideoPlayer,
  YouTubeEmbed,
  Divider,
  pre: MdxPre,
  APlayer: TwistAPlayer,
  TheEnd,
  OutLink,
  BetweenArticle,
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'group font-heading scroll-m-20 text-4xl font-bold',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'group text-secondary font-heading scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'group font-heading scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'group font-heading scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'group scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'group scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.LinkHTMLAttributes<HTMLAnchorElement>) => {
    if ('aria-label' in props) {
      return (
        <a
          className={cn('float-left mr-[0.4em] ml-[-1em] opacity-0 group-hover:opacity-100 text-link font-[0.85em] transition-all duration-300', className)}
          href={props.href}
        >
          #
        </a>
      )
    }
    return (
      <a
        target='_blank'
        className={cn('font-medium text-hover border-b border-solid border-link hover:border-primary transition-all duration-300', className)}
        {...props}
      />
    )
  },
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-8 my-[1.25em]', className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 md:w-full sm:w-full lg:w-2/3 xl:2/3 2xl:2/3 overflow-y-auto'>
      <table className={cn(className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn('m-0 border-t p-0', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn('mt-2 leading-8', className)} {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement> & { 'data-language'?: string }) => !props['data-language'] ? (
    <code
      className={cn(
        'relative rounded bg-round px-[0.3rem] py-[0.2rem] font-mono text-sm text-block',
        className
      )}
      {...props}
    />
  ) : (
    <code {...props}></code>
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn('my-3 px-2 py-[0.1rem] md:my-4 text-muted border-l-[0.25em] border-muted')} {...props} />
  )
}

interface MdxProps {
  code: string
}

export default function Mdx({ code }: MdxProps) {
  const MDXComponent = useMDXComponent(code)
  return (
    <div className='mdx slide-enter-content'>
      <MDXComponent components={components} />
    </div>
  )
}