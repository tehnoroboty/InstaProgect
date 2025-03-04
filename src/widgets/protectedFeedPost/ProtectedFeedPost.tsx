import type { Post, PostImage } from '@/src/entities/post/types'

import React from 'react'

import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { CreationTime } from '@/src/shared/ui/creationTime/CreationTime'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import Image from 'next/image'

import s from './protectedFeedPost.module.scss'

export const ProtectedFeedPost = (props: Post) => {
  const { avatarOwner, createdAt, description, id, images, likesCount, userName } = props

  const renderImgCarousel = (img: PostImage) => {
    return <Image alt={''} className={s.img} height={img.height} src={img.url} width={img.width} />
  }
  //TODO: запрос за комментариями к посту по айди поста

  const isFollowedBy = true //TODO: запрос за пользователем, чтобы узнать, фолловиим ли мы его
  const isOurPost = false // TODO: сравнить есть ли пост с таким айди у нас

  return (
    <div className={s.card}>
      <div className={s.cardHeader}>
        <div className={s.cardHeaderGroup}>
          <UserAvatarName className={s.owner} url={avatarOwner} username={userName} />
          <CreationTime createdAt={createdAt} type={'timeSince'} />
        </div>
        <DropdownPost isFollowedBy={isFollowedBy} isOurPost={isOurPost} />
      </div>
      <div className={s.carouselContainer}>
        <Carousel list={images} renderItem={renderImgCarousel} size={'large'} />
      </div>
    </div>
  )
}
