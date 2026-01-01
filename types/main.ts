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