import React, {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react'

type PostType = 'blog' | 'logs'
type Category = {
  name: string;
  type: PostType;
  selected: boolean;
};

interface CategoryContextType {
  categories: Category[];
  setSelectedCategory: (type: PostType) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Blog', type: 'blog', selected: true },
    { name: 'Memoirs', type: 'logs', selected: false }
  ])

  const setSelectedCategory = (type: PostType) => {
    setCategories(prev => prev.map(cat => {
      if (cat.type === type) {
        return {
          ...cat,
          type,
          selected: true
        }
      }

      return {
        ...cat,
        selected: false
      }
    }))
  }

  return (
    <CategoryContext.Provider value={{ categories, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider')
  }
  return context
}
