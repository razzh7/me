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
      <Divider />
      <p className={styles.title}>前端</p>
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
      <Divider />
      <p className={styles.title}>其他</p>
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
    </Wrapper>
  )
}
