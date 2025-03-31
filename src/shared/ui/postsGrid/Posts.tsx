'use client'
import React from 'react'

import { Post } from '@/src/entities/post/types'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
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
  publicPost?: Post | null
  publicPosts?: any
}

export const Posts = ({ posts, publicPosts }: Props) => {
  const router = useRouter()
  const params = useParams() as { userId: string }
  const onClickPostHandler = (postId: number) => {
    const basePath = publicPosts ? '/public/profile' : '/profile'
    const method = publicPosts ? 'replace' : 'push'

    router[method](`${basePath}/${params.userId}?postId=${postId}`, {
      scroll: false,
    })
  }

  const renderImgCarousel = (img: ImageType) => {
    return (
      <Image alt={'Post image'} className={s.postImage} height={228} src={img.url} width={234} />
    )
  }

  return (
    <div className={s.postsGrid}>
      {posts.map(post => {
        return (
          <div className={s.image} key={post.id} onClick={() => onClickPostHandler(post.id)}>
            {post.images.length === 0 ? (
              <ImageNotFound className={s.postImage} height={194} width={199} />
            ) : post.images.length === 1 ? (
              <Image
                alt={'Post image'}
                className={s.postImage}
                height={228}
                src={post.images[0].url}
                width={234}
              />
            ) : (
              <Carousel list={post.images} renderItem={renderImgCarousel} />
            )}
          </div>
        )
      })}
    </div>
  )
}
