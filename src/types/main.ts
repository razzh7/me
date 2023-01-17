export interface ParamsId {
  id: string
}

export interface PostItem {
  params: ParamsId
}

export interface Posts {
  posts: PostItem[]
}

export interface PostContent {
  id: string
  title: string
  date: string
  htmlContent: string
}

export interface PostProps {
  content: PostContent
}
