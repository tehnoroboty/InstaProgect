'use client'
import React, { memo } from 'react'

import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import { Item } from '@/src/shared/model/api/types'
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
  posts: Item[] | PostType[]
}

export const Posts = memo(({ posts }: Props) => {
  const router = useRouter()
  const params = useParams() as { userId: string }
  const onClickPostHandler = (postId: number) => {
    router.push(`/profile/${params.userId}?postId=${postId}`, { scroll: false })
  }
  const renderImgCarousel = (img: ImageType, index: number) => {
    return (
      <Image alt={'Post image'} height={228} priority={index === 0} src={img.url} width={234} />
    )
  }

  return (
    <div className={s.postsGrid}>
      {posts.map(post => {
        return (
          <div className={s.image} key={post.id} onClick={() => onClickPostHandler(post.id)}>
            {post.images.length > 0 ? (
              <Carousel list={post.images} renderItem={renderImgCarousel} size={'large'} />
            ) : (
              <div className={s.notFound}>
                <ImageNotFound height={194} width={199} />
                <div>
                  <b>No Image</b>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
})
