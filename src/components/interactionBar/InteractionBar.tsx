'use client'

import { useState } from 'react'

import {
  Bookmark,
  BookmarkOutline,
  Heart,
  HeartOutline,
  MessageCircle,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/src/assets/componentsIcons'
import clsx from 'clsx'

import s from '@/src/components/interactionBar/interactionBar.module.scss'

// type LikeStatus = 'DISLIKE' | 'LIKE' | 'NONE'

type Props = {
  hasCommentIcon?: boolean
}

export const InteractionBar = ({ hasCommentIcon = true }: Props) => {
  const [isLikedPost, setIsLikedPost] = useState<boolean>(false)
  const [isSavedPost, setIsSavedPost] = useState<boolean>(false)

  const handleLikePost = () => {
    setIsLikedPost(prevLikedPost => !prevLikedPost)
  }
  const handleSavePost = () => {
    setIsSavedPost(prevSavedPost => !prevSavedPost)
  }

  return (
    <div className={s.interactionBar}>
      <div className={clsx(s.interactionBarLeftSide, { [s.withMessageIcon]: hasCommentIcon })}>
        <div className={s.postLike}>
          {isLikedPost ? (
            <div title={'Unlike'}>
              <Heart className={clsx(s.interactionIcon, s.red)} onClick={handleLikePost} />
            </div>
          ) : (
            <div title={'Like'}>
              <HeartOutline className={s.interactionIcon} onClick={handleLikePost} />
            </div>
          )}
        </div>
        {hasCommentIcon && (
          <div className={s.comment} title={'Comment'}>
            <MessageCircleOutline className={s.interactionIcon} />
          </div>
        )}
        <div className={s.share} title={'Share Post'}>
          <PaperPlaneOutline className={s.interactionIcon} />
        </div>
      </div>

      <div className={s.save}>
        {isSavedPost ? (
          <div title={'Remove'}>
            <Bookmark className={s.interactionIcon} onClick={handleSavePost} />
          </div>
        ) : (
          <div title={'Save'}>
            <BookmarkOutline className={s.interactionIcon} onClick={handleSavePost} />
          </div>
        )}
      </div>
    </div>
  )
}
