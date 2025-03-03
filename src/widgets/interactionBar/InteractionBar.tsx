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
import clsx from 'clsx'

import s from '@/src/widgets/interactionBar/interactionBar.module.scss'

// type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

type Props = {
  hasCommentIcon?: boolean
  isLiked?: boolean
  likesCount?: number
} & ComponentPropsWithoutRef<'div'>

export const InteractionBar = ({
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
        <div className={s.postLike}>
          {isLikedPost ? (
            <div className={s.interactionIconWrapper} title={'Unlike'}>
              <Heart
                className={clsx(s.interactionIcon, s.red)}
                onClick={handleLikePost}
                tabIndex={0}
              />
            </div>
          ) : (
            <div className={s.interactionIconWrapper} title={'Like'}>
              <HeartOutline className={s.interactionIcon} onClick={handleLikePost} tabIndex={0} />
            </div>
          )}
        </div>
        {hasCommentIcon && (
          <div className={s.interactionIconWrapper} title={'Comment'}>
            <MessageCircleOutline className={s.interactionIcon} tabIndex={0} />
          </div>
        )}
        <div className={s.interactionIconWrapper} title={'Share Post'}>
          <PaperPlaneOutline className={s.interactionIcon} tabIndex={0} />
        </div>
      </div>

      <div className={s.save}>
        {isSavedPost ? (
          <div className={s.interactionIconWrapper} title={'Remove'}>
            <Bookmark className={s.interactionIcon} onClick={handleSavePost} tabIndex={0} />
          </div>
        ) : (
          <div className={s.interactionIconWrapper} title={'Save'}>
            <BookmarkOutline className={s.interactionIcon} onClick={handleSavePost} tabIndex={0} />
          </div>
        )}
      </div>
    </div>
  )
}
