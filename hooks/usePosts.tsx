import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode
} from 'react'
import { getAllSortedPosts, type PostsProps } from '@/util/post'
import { Post } from 'contentlayer/generated'

type PostType = 'blog' | 'logs'
type Category = {
  name: string;
  type: PostType;
  selected: boolean;
  tag?: boolean;
};

interface PostsContextType {
  posts: PostsProps[];
  categories: Category[];
  setSelectedCategory: (type: PostType) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Blog', type: 'blog', selected: true },
    { name: 'Memoirs', type: 'logs', selected: false, tag: true }
  ])
  const [posts, setPosts] = useState(() =>
    getAllSortedPosts()
      .filter((post: Post) => post.category === 'blog')
  )

  const setSelectedCategory = useCallback((type: PostType) => {
    const currentCategory = categories.find(cat => cat.selected)?.type

    if (currentCategory === type) return

    setCategories(prev => prev.map(cat => ({
      ...cat,
      selected: cat.type === type
    })))

    setPosts(getAllSortedPosts().filter((post: Post) => post.category === type))
  }, [categories])

  return (
    <PostsContext.Provider value={{ categories, setSelectedCategory, posts }}>
      {children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider')
  }
  return context
}
