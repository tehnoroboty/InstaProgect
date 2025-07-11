'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

import {
  Bookmark,
  BookmarkOutline,
  Heart,
  HeartOutline,
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

  const likeButtonIcon = isLikedPost ? (
    <Heart className={clsx(s.interactionIcon, s.red)} />
  ) : (
    <HeartOutline className={s.interactionIcon} />
  )
  const likeButtonTitle = isLikedPost ? 'Unlike' : 'Like'

  const bookmarkIcon = isSavedPost ? (
    <Bookmark className={s.interactionIcon} />
  ) : (
    <BookmarkOutline className={s.interactionIcon} />
  )
  const bookmarkTitle = isSavedPost ? 'Remove' : 'Save'

  return (
    <div className={clsx(s.interactionBar, className)}>
      <div className={clsx(s.interactionBarLeftSide, { [s.withMessageIcon]: hasCommentIcon })}>
        <Button
          className={clsx(s.interactionIconWrapper, { [s.outlineIcon]: !isLikedPost })}
          onClick={handleLikePost}
          title={likeButtonTitle}
          variant={'transparent'}
        >
          {likeButtonIcon}
        </Button>

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
        <Button
          className={clsx(s.interactionIconWrapper, { [s.outlineIcon]: !isSavedPost })}
          onClick={handleSavePost}
          title={bookmarkTitle}
          variant={'transparent'}
        >
          {bookmarkIcon}
        </Button>
      </div>
    </div>
  )
}
