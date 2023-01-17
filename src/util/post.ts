import path from 'path'
import fs from 'fs'
import { format } from 'date-fns'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypePrism from 'rehype-prism-plus'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import MarkdownIt from 'markdown-it'
import Shiki from 'markdown-it-shiki'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')
const md = new MarkdownIt()
export const getAllSortedPosts = () => {
  const postNames = fs.readdirSync(postsDirectory)
  const allPosts = postNames.map(name => {
    const id = name.replace('.md', '')
    const postBody = fs.readFileSync(path.join(postsDirectory, name))
    const matterResult = matter(postBody)

    return {
      id,
      date: format(matterResult.data.date, 'LLLL d, yyyy')
    }
  })

  return allPosts.sort(({ date: a }, { date: b }) => {
    const timeA = new Date(a)
    const timeB = new Date(b)

    return timeB.getTime() - timeA.getTime()
  })
}

export const getAllPostIds = () => {
  const postNames = fs.readdirSync(postsDirectory)

  return postNames.map(postname => {
    return {
      params: {
        id: postname.replace('.md', '')
      }
    }
  })
}

export const getPostContent = async (id: string) => {
  const targetPath = path.join(postsDirectory, `${id}.md`)
  const postContent = fs.readFileSync(targetPath, 'utf8')

  const matterResult = matter(postContent)
  // const content = await unified()
  //   .use(remarkParse)
  //   .use(remarkRehype)
  //   .use(rehypeHighlight)
  //   .use(rehypePrism)
  //   .use(rehypeDocument)
  //   .use(rehypeFormat)
  //   .use(rehypeStringify)
  //   .process(matterResult.content)

  // var result = md.render(matterResult.content)
  // console.log('res', result)

  // const htmlContent = content.value
  md.use(Shiki, {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  })
  const htmlContent = md.render(matterResult.content)
  return {
    id,
    date: format(matterResult.data.date, 'LLLL d, yyyy'),
    title: matterResult.data.title,
    htmlContent
  }
}
