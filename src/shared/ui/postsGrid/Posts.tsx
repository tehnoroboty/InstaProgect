'use client'
import React from 'react'

import Image from 'next/image'

import s from './posts.module.scss'

type Props = {
  posts: any
}

export const Posts = ({ posts }: Props) => {
  const onClickPostHandler = (post: any) => {
    console.log(post)
  }

  return (
    <div className={s.postsGrid}>
      {p.map((post, index) => {
        return (
          <div className={s.image} key={index} onClick={() => onClickPostHandler(post)}>
            {/* <Image alt={''} height={300} src={'post.url'}
             width={300} />*/}
          </div>
        )
      })}
    </div>
  )
}

const p = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
