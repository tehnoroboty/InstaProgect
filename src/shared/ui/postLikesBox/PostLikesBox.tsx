import { ComponentPropsWithoutRef } from 'react'

import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from '@/src/shared/ui/postLikesBox/postLikesBox.module.scss'

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type Props = {
  avatars?: Avatar[]
  likesCount?: number
} & ComponentPropsWithoutRef<'div'>

export const PostLikesBox = ({ avatars = [], className, likesCount }: Props) => {
  const firstThreeAvatars = avatars.slice(0, 3)
  const avatarClasses = [s.firstAvaLike, s.secondAvaLike, s.thirdAvaLike]

  return (
    <div className={clsx(s.postLikes, className)}>
      {avatars.length === 0 || likesCount === 0 ? (
        <Typography as={'div'} className={s.likeCount}>
          {'Be the first to like this'}
        </Typography>
      ) : (
        <>
          <div className={s.postLikesAvatars}>
            {firstThreeAvatars.map((avatar, index) => (
              <AvatarBox
                className={avatarClasses[index]}
                key={avatar.url}
                size={'xxs'}
                src={avatar.url}
              />
            ))}
          </div>
          <div className={s.likeCount}>
            <Typography as={'span'}>{likesCount}</Typography>
            <Typography as={'span'} option={'bold_text14'}>
              {` "Like"`}
            </Typography>
          </div>
        </>
      )}
    </div>
  )
}
