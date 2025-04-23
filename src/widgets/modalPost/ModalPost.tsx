import React from 'react'

import { Post } from '@/src/entities/post/types'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import { GetCommentsResponse, ImageType } from '@/src/shared/model/api/types'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { ModalCommentsSection } from '@/src/widgets/commentsSection/ModalCommentsSection'
import Image from 'next/image'

import s from './modalPost.module.scss'

type Props = {
  comments?: GetCommentsResponse
  isAuth: boolean
  isMyPost: boolean
  onClose: () => void
  open: boolean
  post?: Post
}

export default function ModalPost({ comments, isAuth, isMyPost, onClose, open, post }: Props) {
  if (!post) {
    return null
  }
  console.log('isMyPost', isMyPost)
  console.log('isAuth', isAuth)
  const isCarousel = post.images.length > 1
  const renderItem = (item: ImageType) => {
    return item ? (
      <Image alt={'post'} className={s.image} height={490} priority src={item.url} width={562} />
    ) : (
      <div className={s.notFound}>
        <ImageNotFound height={194} width={199} />
        <div>
          <b>No Image</b>
        </div>
      </div>
    )
  }
  const commentsData = comments?.items ?? []

  return (
    <>
      <Dialog className={s.dialog} closeClassName={s.closeClassName} onClose={onClose} open={open}>
        <div className={s.container}>
          {isCarousel ? (
            <Carousel list={post.images} renderItem={renderItem} size={'large'} />
          ) : (
            renderItem(post.images[0])
          )}
          <ModalCommentsSection
            commentsData={commentsData}
            isAuth={isAuth}
            isMyPost={isMyPost}
            post={post}
          />
        </div>
      </Dialog>
    </>
  )
}
