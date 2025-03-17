'use client'
import React from 'react'

import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import s from './posts.module.scss'

type ImageType = {
  height?: number
  url: string
  width?: number
}

type PostType = {
  id: number
  images: ImageType[]
}

type Props = {
  posts: PostType[]
}

export const Posts = ({ posts }: Props) => {
  const router = useRouter()
  const params = useParams() as { userId: string }

  const onClickPostHandler = (postId: number) => {
    router.replace(`/profile/${params.userId}?postId=${postId}`)
  }

  const renderImgCarousel = (img: ImageType) => {
    return (
      <Image alt={'Post image'} className={s.carouselImg} height={300} src={img.url} width={300} />
    )
  }

  return (
    <div className={s.postsGrid}>
      {posts.map(post => {
        if (post.images.length < 1) {
          return null
        }

        return (
          <div className={s.image} key={post.id} onClick={() => onClickPostHandler(post.id)}>
            <Carousel list={post.images} renderItem={renderImgCarousel} size={'large'} />
          </div>
        )
      })}
    </div>
  )
}
