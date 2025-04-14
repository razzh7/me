import { allPosts, Post } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Mdx from '@/components/mdx-components'
import { getTableOfContents } from "@/util/toc"
import DashboardTableOfContents from '@/components/toc'
import { ScrollArea } from '@/components/scroll-area'
import { postTimeHandler } from '@/util/post'
import Badge from '@/components/badge'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getSpecialPost({ params })

  return {
    title: post?.title
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath
  }))
}

function getSpecialPost({ params }: PostPageProps) {
  return allPosts.find((post: Post) => post._raw.flattenedPath === params.slug)
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getSpecialPost({ params })
  if (!post) notFound()
  const { mouthDay, readtime, updatedTime, preview } = postTimeHandler(post)
  const toc = await getTableOfContents(post.body.raw)

  return (
    <div>
      <div className="max-w-prose m-auto">
        <p className="text-4xl font-[800] text-secondary">{post.title}</p>
        <p className="flex items-center mt-4 text-muted">
          {mouthDay} · {readtime}
          {updatedTime ? ` · updated on ${updatedTime}` : ''}
          {preview ? (
            <Badge className='ml-2'>
              Updating
            </Badge>
          ) : null}
        </p>
      </div>
      <article className="py-6 lg:py-8">
        <Mdx code={post.body.code} />
        {
          post.toc ? (
            <div className="hidden text-sm xl:block">
              <div className="fixed top-28 right-20 w-max-[300px] pt-4">
                <ScrollArea className="pb-10">
                  <div className="-mt-10 h-[calc(100vh-3.5rem)] py-12">
                    <DashboardTableOfContents toc={toc} />
                  </div>
                </ScrollArea>
              </div>
            </div>
          ) : null
        }
      </article>
​    </div>
  )
}