export interface PostContent {
  id: string
  title: string
  date: string
  htmlContent: string
  readtime: string
  words: string | number
  category: string
  length?: number
}

export interface ParamsId {
  id: string
}

export interface PostItem {
  params: ParamsId
}

export interface Posts {
  posts: PostContent[]
}

export type BlogType = 'posts' | 'memoirs'

export interface Books {
  books: BooksItem[]
}

export interface BooksItem {
  title: string
  spine: string
  tag: string
  cover: string
}

export type CodeLanguages =
  'js' |
  'ts' |
  'jsx' |
  'tsx' |
  'react' |
  'vue' |
  'css' |
  'less' |
  'scss' |
  'sass' |
  'html' |
  'json' |
  'bash' |
  'shell' |
  'yaml' |
  'markdown' |
  'mdx' |
  'python' |
  'java' |
  'csharp' |
  'cpp' |
  'ruby' |
  'go' |
  'php' |
  'rust' |
  'dockerfile' |
  'sql' |
  'nginx'