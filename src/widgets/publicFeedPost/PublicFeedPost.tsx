import type { Post, PostImage } from '@/src/entities/post/types'

import React, { useState } from 'react'

import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { CreationTime } from '@/src/shared/ui/creationTime/CreationTime'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import Image from 'next/image'

import s from './publicFeedPost.module.scss'

export const PublicFeedPost = (props: Post) => {
  const { avatarOwner, createdAt, description, id, images, userName } = props

  const [open, setOpen] = useState<boolean>(false)

  const isDescriptionLong = description.length > 95
  const truncatedDescription = description.slice(0, 83) + '...'

  const classNames = clsx(s.cardLowerPart, { [s.shifted]: open })
  const containerClasses = clsx(s.carouselContainer, { [s.open]: open })

  const renderImgCarousel = (img: PostImage) => {
    return <Image alt={''} className={s.img} height={img.height} src={img.url} width={img.width} />
  }

  return (
    <div className={s.card} id={`${id}`}>
      <div className={containerClasses}>
        <Carousel disableSwipe={open} list={images} renderItem={renderImgCarousel} size={'small'} />
      </div>
      <Collapsible.Root onOpenChange={setOpen} open={open}>
        <div className={classNames}>
          <UserAvatarName className={s.owner} url={avatarOwner} username={userName} />
          <CreationTime createdAt={createdAt} type={'timeSince'} />
          <p className={s.descriptionText}>
            {!isDescriptionLong || open ? description : truncatedDescription}
          </p>
          <Collapsible.Trigger asChild>
            {isDescriptionLong && (
              <Button className={s.showmoreBtn} variant={'transparent'}>
                {open ? 'Hide' : 'Show more'}
              </Button>
            )}
          </Collapsible.Trigger>
        </div>
      </Collapsible.Root>
    </div>
  )
}
