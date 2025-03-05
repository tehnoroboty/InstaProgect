'use client'
import { useState } from 'react'

import { timeSince } from '@/src/shared/lib/timeSince'
import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'

import s from './publicFeedPost.module.scss'
// эти типы пока положила сюда. по итогу они уйдут в типизацию ответа от эндпоинта
type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type Owner = {
  firstName: string
  lastName: string
}

type PropsType = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

export const PublicFeedPost = (props: PropsType) => {
  const { avatarOwner, createdAt, description, id, images, userName } = props

  const [open, setOpen] = useState<boolean>(false)

  const isDescriptionLong = description.length > 95
  const truncatedDescription = description.slice(0, 83) + '...'

  const classNames = clsx(s.cardLowerPart, { [s.shifted]: open })

  return (
    <div className={s.card}>
      <div className={s.mockCarousel}>{'PHOTO CAROUSEL'}</div>
      <Collapsible.Root onOpenChange={setOpen} open={open}>
        <div className={classNames}>
          <div className={s.owner}>
            <div className={s.mockAvatar}>{userName[0]}</div>
            <div className={s.mockUsername}>{userName}</div>
          </div>
          <div className={s.creationTime}>{timeSince(createdAt)}</div>
          <p className={s.descriptionText}>
            {!isDescriptionLong || open ? description : truncatedDescription}
            {isDescriptionLong && (
              <Collapsible.Trigger asChild>
                <button className={s.showmoreBtn} type={'button'}>
                  {open ? 'Hide' : 'Show more'}
                </button>
              </Collapsible.Trigger>
            )}
          </p>
        </div>
      </Collapsible.Root>
    </div>
  )
}
