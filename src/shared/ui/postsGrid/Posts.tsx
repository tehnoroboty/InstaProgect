'use client'
import React from 'react'

import s from './posts.module.scss'

type Props<T> = {
  posts: T[]
  renderItem: (item: T, index?: number) => React.ReactNode
}

export const Posts = <T,>({ posts, renderItem }: Props<T>) => {
  const onClickPostHandler = (post: any) => {
    console.log(post)
  }

  return (
    <div className={s.postsGrid}>
      {posts.map((post, index) => {
        return (
          <div className={s.image} key={index} onClick={() => onClickPostHandler(post)}>
            {renderItem(post)}
          </div>
        )
      })}
    </div>
  )
}

const p = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
