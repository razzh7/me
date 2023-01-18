export interface PostContent {
  id: string
  title: string
  date: string
  htmlContent: string
  readtime: string
  words: string | number
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
}
