'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

import {
  Bookmark,
  BookmarkOutline,
  Heart,
  HeartOutline,
  MessageCircle,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/src/shared/assets/componentsIcons'
import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'

import s from '@/src/widgets/interactionBar/interactionBar.module.scss'

type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

type Props = {
  LikeStatus?: LikeStatus
  hasCommentIcon?: boolean
  isLiked?: boolean
  likesCount?: number
} & ComponentPropsWithoutRef<'div'>

export const InteractionBar = ({
  LikeStatus,
  className,
  hasCommentIcon = true,
  isLiked,
  likesCount,
}: Props) => {
  const [isLikedPost, setIsLikedPost] = useState<boolean>(false)
  const [isSavedPost, setIsSavedPost] = useState<boolean>(false)

  const handleLikePost = () => {
    setIsLikedPost(prevLikedPost => !prevLikedPost)
  }
  const handleSavePost = () => {
    setIsSavedPost(prevSavedPost => !prevSavedPost)
  }

  return (
    <div className={clsx(s.interactionBar, className)}>
      <div className={clsx(s.interactionBarLeftSide, { [s.withMessageIcon]: hasCommentIcon })}>
        {isLikedPost ? (
          <Button
            className={s.interactionIconWrapper}
            onClick={handleLikePost}
            title={'Unlike'}
            variant={'transparent'}
          >
            <Heart className={clsx(s.interactionIcon, s.red)} />
          </Button>
        ) : (
          <Button
            className={clsx(s.interactionIconWrapper, s.outlineIcon)}
            onClick={handleLikePost}
            title={'Like'}
            variant={'transparent'}
          >
            <HeartOutline className={s.interactionIcon} />
          </Button>
        )}
        {hasCommentIcon && (
          <Button
            className={clsx(s.interactionIconWrapper, s.outlineIcon)}
            title={'Comment'}
            variant={'transparent'}
          >
            <MessageCircleOutline className={s.interactionIcon} />
          </Button>
        )}
        <Button
          className={clsx(s.interactionIconWrapper, s.outlineIcon)}
          title={'Share Post'}
          variant={'transparent'}
        >
          <PaperPlaneOutline className={s.interactionIcon} />
        </Button>
      </div>

      <div className={s.save}>
        {isSavedPost ? (
          <Button
            className={s.interactionIconWrapper}
            onClick={handleSavePost}
            title={'Remove'}
            variant={'transparent'}
          >
            <Bookmark className={s.interactionIcon} />
          </Button>
        ) : (
          <Button
            className={clsx(s.interactionIconWrapper, s.outlineIcon)}
            onClick={handleSavePost}
            title={'Save'}
            variant={'transparent'}
          >
            <BookmarkOutline className={s.interactionIcon} />
          </Button>
        )}
      </div>
    </div>
  )
}
