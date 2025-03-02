import type { Post, PostImage } from '@/src/entities/posts/types'

import { useState } from 'react'

import { timeSince } from '@/src/shared/lib/timeSince'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
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
        <Carousel list={images} renderItem={renderImgCarousel} size={'small'} />
      </div>
      <Collapsible.Root onOpenChange={setOpen} open={open}>
        <div className={classNames}>
          <UserAvatarName className={s.owner} url={avatarOwner} username={userName} />
          <div className={s.creationTime}>{timeSince(createdAt)}</div>
          <p className={s.descriptionText}>
            {!isDescriptionLong || open ? description : truncatedDescription}
          </p>
          <Collapsible.Trigger asChild>
            {isDescriptionLong && (
              <button className={s.showmoreBtn} type={'button'}>
                {open ? 'Hide' : 'Show more'}
              </button>
            )}
          </Collapsible.Trigger>
        </div>
      </Collapsible.Root>
    </div>
  )
}
