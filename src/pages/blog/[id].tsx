import { getPostContent, getAllPostIds } from '@/util/post'
import { PostItem } from '@/types/main'
import { PostProps } from '@/types/main'
import Wrapper from '@/components/Wrapper'
import styles from '@/styles/postDetail.module.css'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Head from 'next/head'

const Post = ({ content }: PostProps) => {
  const { date, title, htmlContent, readtime, words } = content

  return (
    <Wrapper>
      <Head>
        <title>{title} by XiaoHao</title>
      </Head>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>
          {date} · {readtime}
        </p>
        <p className={styles.date}>{words}</p>
      </div>
      <article className="prose">
        <ReactMarkdown children={htmlContent} rehypePlugins={[rehypeRaw]} />
      </article>
    </Wrapper>
  )
}

export default Post

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }: PostItem) => {
  const content = await getPostContent(params.id)

  return {
    props: {
      content: content
    }
  }
}
