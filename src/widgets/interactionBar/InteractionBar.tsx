'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

import { CustomerError } from '@/src/entities/errors/types'
import { LikeStatus } from '@/src/entities/likes/types'
import {
  Bookmark,
  BookmarkOutline,
  Heart,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/src/shared/assets/componentsIcons'
import { usePostLikes } from '@/src/shared/hooks/usePostLikes'
import { useUpdateLikeStatusPostMutation } from '@/src/shared/model/api/postsApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'

import s from '@/src/widgets/interactionBar/interactionBar.module.scss'

type Props = {
  hasCommentIcon?: boolean
  postId: number
} & ComponentPropsWithoutRef<'div'>

export const InteractionBar = ({ className, hasCommentIcon = true, postId }: Props) => {
  const [isSavedPost, setIsSavedPost] = useState<boolean>(false)
  const [updateLikeStatus] = useUpdateLikeStatusPostMutation()
  const dispatch = useAppDispatch()

  const { isLiked } = usePostLikes(postId)

  const handleLikePost = async () => {
    if (!postId) {
      return
    }
    const newLikeStatus: LikeStatus = isLiked ? 'NONE' : 'LIKE'

    try {
      await updateLikeStatus({ model: { likeStatus: newLikeStatus }, postId }).unwrap()
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0].message || error.data?.error || 'Failed to update like status'

      dispatch(setAppError({ error: errorMessage }))
    }
  }
  const handleSavePost = () => {
    setIsSavedPost(prevSavedPost => !prevSavedPost)
  }

  return (
    <div className={clsx(s.interactionBar, className)}>
      <div className={clsx(s.interactionBarLeftSide, { [s.withMessageIcon]: hasCommentIcon })}>
        <Button
          className={clsx(s.interactionIconWrapper, { [s.outlineIcon]: !isLiked })}
          onClick={handleLikePost}
          title={isLiked ? 'Unlike' : 'Like'}
          variant={'transparent'}
        >
          {isLiked ? (
            <Heart className={clsx(s.interactionIcon, s.red)} />
          ) : (
            <HeartOutline className={s.interactionIcon} />
          )}
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
          title={isSavedPost ? 'Remove' : 'Save'}
          variant={'transparent'}
        >
          {isSavedPost ? (
            <Bookmark className={s.interactionIcon} />
          ) : (
            <BookmarkOutline className={s.interactionIcon} />
          )}
        </Button>
      </div>
    </div>
  )
}
