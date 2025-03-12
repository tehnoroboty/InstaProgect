'use client'
import React from 'react'

import Image from 'next/image'

import s from './posts.module.scss'

type ImageType = {
  url: string
}

type PostType = {
  images: ImageType[]
}

type Props = {
  posts: PostType[]
}

export const Posts = ({ posts }: Props) => {
  const onClickPostHandler = (post: any) => {
    console.log(post)
  }

  return (
    <div className={s.postsGrid}>
      {posts.map((post, index) => {
        return (
          <div className={s.image} key={index} onClick={() => onClickPostHandler(post)}>
            <Image alt={'Post image'} height={300} src={post.images[0].url} width={300} />
          </div>
        )
      })}
    </div>
  )
}
