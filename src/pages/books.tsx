import React from 'react'
import Books from '@/components/Books'
import Wrapper from '@/components/Wrapper'
import styles from '@/styles/books.module.css'
import Divider from '@/components/Divider'
import Head from 'next/head'

export default function books() {
  return (
    <Wrapper>
      <Head>
        <title>书单</title>
      </Head>
      <p className={styles.title}>正在阅读</p>
      <div className={styles.bookshelf}>
        <Books
          books={[
            {
              title: '你不知道的JavaScript（上）',
              spine: '#F7DF4B',
              tag: 'JS',
              cover: '/img/js1.jpg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '深入浅出NodeJS',
              spine: '#FFFFFF',
              tag: 'node',
              cover: '/books/node.jpeg'
            }
          ]}
        ></Books>
      </div>
      <Divider />
      <p className={styles.title}>前端</p>
      <div className={styles.bookshelf}>
        <Books
          books={[
            {
              title: 'JavaScript高级程序设计',
              spine: '#9C1A31',
              tag: 'JS',
              cover: '/books/javascript.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '深入浅出Vue.js',
              spine: '#52B47E',
              tag: 'Vue',
              cover: '/books/vue2.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: 'Vue.js 设计与实现',
              spine: '#52B47E',
              tag: 'Vue',
              cover: '/books/vue3.jpg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: 'JavaScript设计模式与开发实践',
              spine: '#1D4699',
              tag: '',
              cover: '/books/jsDesign.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '你不知道的JavaScript（中）',
              spine: '#F7DF4B',
              tag: 'JS',
              cover: '/books/js2.jpg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '深入理解ES6',
              spine: '#FFFCD0',
              tag: 'ES6',
              cover: '/books/es6.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: 'web性能权威指南',
              spine: '#FFFFFF',
              tag: 'web',
              cover: '/books/web.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '深入React技术栈',
              spine: '#122D44',
              tag: 'React',
              cover: '/books/react.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: 'WebKit技术内幕',
              spine: '#9F3A35',
              tag: 'web',
              cover: '/books/webkit.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '前端架构师',
              spine: '#829F41',
              tag: 'web',
              cover: '/books/webbuilder.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: 'CSS权威指南',
              spine: '#009497',
              tag: 'css',
              cover: '/books/cssauth.jpeg'
            }
          ]}
        ></Books>
      </div>
      <Divider />
      <p className={styles.title}>其他</p>
      <div className={styles.bookshelf}>
        <Books
          books={[
            {
              title: '时间从来不语，却回答了所有问题',
              spine: '#E5CA9D',
              tag: '',
              cover: '/books/time.jpeg'
            }
          ]}
        ></Books>
        <Books
          books={[
            {
              title: '停止你的内在战争',
              spine: '#E45D42',
              tag: '',
              cover: '/books/stopwar.jpeg'
            }
          ]}
        ></Books>
      </div>
    </Wrapper>
  )
}
