import path from 'path'
import fs from 'fs'
import { format } from 'date-fns'
import matter from 'gray-matter'
import estimateTime from './readtime'
import Markdown from './markdownit'

const postsDirectory = path.join(process.cwd(), 'src', 'posts')

export const getAllSortedPosts = () => {
  const postNames = fs.readdirSync(postsDirectory)
  const allPosts = postNames.map(name => {
    const id = name.replace('.md', '')
    const postBody = fs.readFileSync(path.join(postsDirectory, name))
    const matterResult = matter(postBody)
    const { readtime } = estimateTime(matterResult.content)

    return {
      id,
      title: matterResult.data.title,
      date: format(matterResult.data.date, 'LLLL d, yyyy'),
      readtime,
      tech: matterResult.data.tech
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
  const { readtime, words } = estimateTime(matterResult.content)

  const md = new Markdown()
  // 设置代码块主题
  md.setTheme()
  // 设置a链接target="_bank"
  md.setLinkOpen()
  // 设置锚点
  md.setAnchor()
  // 设置TOC
  md.setTableContent()
  // render markdown to html
  const htmlContent = md.render(matterResult.content)

  return {
    id,
    date: format(matterResult.data.date, 'LLLL d, yyyy'),
    title: matterResult.data.title,
    htmlContent,
    readtime,
    words
  }
}
