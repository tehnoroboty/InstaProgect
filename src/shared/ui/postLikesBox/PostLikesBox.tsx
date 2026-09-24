'use client'

import { ComponentPropsWithoutRef } from 'react'

import { usePostLikes } from '@/src/shared/hooks/usePostLikes'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from '@/src/shared/ui/postLikesBox/postLikesBox.module.scss'

type Props = {
  onClick?: () => void
  postId: number
} & ComponentPropsWithoutRef<'div'>

export const PostLikesBox = ({ className, onClick, postId }: Props) => {
  const { avatars, likesCount } = usePostLikes(postId)

  const avatarClasses = [s.firstAvaLike, s.secondAvaLike, s.thirdAvaLike]

  return (
    <div className={clsx(s.postLikes, className)} onClick={onClick}>
      {likesCount && likesCount > 0 ? (
        <div className={s.postLikesAvatars}>
          {avatars.map((url, index) => (
            <AvatarBox className={avatarClasses[index]} key={url} size={'xxs'} src={url} />
          ))}
        </div>
      ) : null}
      <div className={s.likeCount}>
        <Typography as={'span'}>{likesCount}</Typography>
        <Typography as={'span'} option={'bold_text14'}>
          {likesCount === 1 ? ` "Like"` : ` "Likes"`}
        </Typography>
      </div>
    </div>
  )
}
