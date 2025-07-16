'use client'

import { ComponentPropsWithoutRef, useMemo } from 'react'

import { useGetPostLikesQuery } from '@/src/shared/model/api/postsApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from '@/src/shared/ui/postLikesBox/postLikesBox.module.scss'

type Props = {
  likesCount?: number
  postId: number
} & ComponentPropsWithoutRef<'div'>

export const PostLikesBox = ({ className, likesCount, postId }: Props) => {
  const { data: likesData } = useGetPostLikesQuery(
    {
      pageSize: 3,
      postId,
    },
    { refetchOnMountOrArgChange: true }
  )

  const avatarClasses = [s.firstAvaLike, s.secondAvaLike, s.thirdAvaLike]

  const avatars = useMemo(() => {
    return [...(likesData?.items || [])]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(user => user.avatars?.[0]?.url)
      .filter(Boolean)
      .slice(0, 3)
  }, [likesData])

  return (
    <div className={clsx(s.postLikes, className)}>
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
