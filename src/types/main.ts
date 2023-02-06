export interface PostContent {
  id: string
  title: string
  date: string
  htmlContent: string
  readtime: string
  words: string | number
  tech: string
  length?: number
}

export interface PostProps {
  content: PostContent
}

export interface ParamsId {
  id: string
}

export interface PostItem {
  params: ParamsId
}

export interface Posts {
  posts: PostContent[]
  onChange: Function
}

export interface Books {
  books: BooksItem[]
}

export interface BooksItem {
  title: string
  spine: string
  tag: string
  cover: string
}
