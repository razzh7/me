import { getPostContent, getAllPostIds } from '@/util/post'
import { PostItem } from '@/types/main'
import { PostProps } from '@/types/main'
import Wrapper from '@/components/Wrapper'
import styles from '@/styles/postDetail.module.css'

const Post = ({ content }: PostProps) => {
  const { date, title, htmlContent } = content

  return (
    <Wrapper>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </div>
      <article className="prose">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
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
  console.log('content', content)
  return {
    props: {
      content: content
    }
  }
}
