'use client'
import { Fragment, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/posts.module.css'
import { getAllSortedPosts } from '@/util/post'
import clsx from 'clsx'
import type { PostsProps } from '@/util/post'

interface Tech {
  name: string
  selected: boolean
}

function PostsList() {
  const [category, setCategory] = useState([
    {
      name: 'Blog',
      selected: true
    }
    // {
    //   name: 'Life',
    //   selected: false
    // }
  ])
  const posts = getAllSortedPosts()
  const handleTech = (item: Tech, idx: number) => {
    setCategory(
      prevCategory => prevCategory.map((prevItem, prevIdx) => {
        if (prevIdx === idx) {
          return {
            ...prevItem,
            selected: true
          }
        } else {
          return {
            ...prevItem,
            selected: false
          }
        }
      })
    )
  }

  const getNowYear = (date: string) => new Date(date).getFullYear()

  const isSameYear = (a: string, b: string) => a && b && getNowYear(a) === getNowYear(b)

  return (
    <Fragment>
      <div className="flex gap-3 md:gap-5 md:mb-5">
        {
          category.map((item, idx) => (
            <span
              className={
                clsx(
                  'text-xl md:text-3xl hover:text-hover cursor-pointer font-[500]',
                  item.selected ? 'text-hover' : 'text-muted'
                )
              }
              key={item.name}
              onClick={() => handleTech(item, idx)}
            >
              {item.name}
            </span>
          ))
        }
      </div>
      <div>
        <ul>
          {
            posts.map((item: PostsProps, idx: number) => (
              <div key={item.id}>
                {
                  !isSameYear(item.date, posts[idx - 1]?.date)
                    ? (
                      <div className="relative h-16 md:h-20">
                        <p className={clsx('absolute -z-10 top-6 -left-10', styles.posts)}>{getNowYear(item.date)}</p>
                      </div>
                    )
                    : null
                }
                <li className="mb-5">
                  <Link className="group md:flex items-center gap-2 cursor-pointer" href={`/posts/${item.id}`}>
                    <div className="text-lg md:text-xl text-primary mb-1 group-hover:text-secondary">{item.title}</div>
                    <div className="text-sm md:text-base text-muted group-hover:text-hover">
                      {item.mouthDay} · {item.readtime}
                    </div>
                  </Link>
                </li>
              </div>
            ))
          }
        </ul>
      </div>
    </Fragment>
  )
}


export default PostsList
