import React from 'react'
import Books from '@/components/books'
import styles from '@/styles/books.module.css'
import Divider from '@/components/divider'
import { Metadata } from 'next'
import { useMemo } from 'react'

export const metadata: Metadata = {
  title: 'Books - Razzh'
}

export default function BooksPage() {
  const reading = useMemo(() => [
    {
      title: 'Python编程 ：从入门到实践',
      spine: '#fae977',
      tag: 'py',
      cover: '/books/python-snake.jpg'
    }
  ], [])
  const frontBook = useMemo(() => [
    {
      title: '深入浅出Vue.js',
      spine: '#52B47E',
      tag: 'Vue',
      cover: '/books/vue2.jpeg'
    },
    {
      title: 'Vue.js 设计与实现',
      spine: '#52B47E',
      tag: 'Vue',
      cover: '/books/vue3.jpg'
    },
    {
      title: 'JavaScript设计模式与开发实践',
      spine: '#1D4699',
      tag: '',
      cover: '/books/jsDesign.jpeg'
    },
    {
      title: '你不知道的JavaScript（中）',
      spine: '#F7DF4B',
      tag: 'JS',
      cover: '/books/js2.jpg'
    },
    {
      title: '你不知道的JavaScript（上）',
      spine: '#F7DF4B',
      tag: 'JS',
      cover: '/books/js1.jpeg'
    },
    {
      title: '深入理解ES6',
      spine: '#FFFCD0',
      tag: 'ES6',
      cover: '/books/es6.jpeg'
    },
    {
      title: 'web性能权威指南',
      spine: '#FFFFFF',
      tag: 'web',
      cover: '/books/web.jpeg'
    },
    {
      title: '深入React技术栈',
      spine: '#122D44',
      tag: 'React',
      cover: '/books/react.jpeg'
    },
    {
      title: 'WebKit技术内幕',
      spine: '#9F3A35',
      tag: 'web',
      cover: '/books/webkit.jpeg'
    },
    {
      title: '前端架构师',
      spine: '#829F41',
      tag: 'web',
      cover: '/books/webbuilder.jpeg'
    },
    {
      title: 'CSS权威指南',
      spine: '#009497',
      tag: 'css',
      cover: '/books/cssauth.jpeg'
    },
    {
      title: '深入浅出NodeJS',
      spine: '#FFFFFF',
      tag: 'node',
      cover: '/books/node.jpeg'
    },
    {
      title: '图解HTTP',
      spine: '#FFFFFF',
      tag: 'HTTP',
      cover: '/books/img-http.jpeg'
    }

  ], [])
  const otherBook = useMemo(() => [
    {
      title: '被讨厌的勇气',
      spine: '#3090e6',
      tag: '',
      cover: '/books/courage.jpg'
    },
    {
      title: 'Python编程 ：从入门到实践',
      spine: '#fae977',
      tag: 'py',
      cover: '/books/python-snake.jpg'
    }
  ], [])

  return (
    <div className="container mb-5">
      <p className={styles.title}>正在阅读</p>
      <div className={styles.bookshelf}>
        {
          reading.map((book) => (
            <Books
              key={book.title}
              title={book.title}
              spine={book.spine}
              tag={book.tag}
              cover={book.cover}
            />
          ))
        }
      </div>
      <Divider />
      <p className={styles.title}>前端</p>
      <div className={styles.bookshelf}>
        {
          frontBook.map((book) => (
            <Books
              key={book.title}
              title={book.title}
              spine={book.spine}
              tag={book.tag}
              cover={book.cover}
            />
          ))
        }
      </div>
      <Divider />
      <p className={styles.title}>其他</p>
      <div className={styles.bookshelf}>
        {
          otherBook.map((book) => (
            <Books
              key={book.title}
              title={book.title}
              spine={book.spine}
              tag={book.tag}
              cover={book.cover}
            />
          ))
        }
      </div>
    </div>
  )
}