'use client'

import { useState } from 'react'

import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons'
import Heart from '@/src/assets/componentsIcons/Heart'
import HeartOutline from '@/src/assets/componentsIcons/HeartOutline'
import PaperPlane from '@/src/assets/componentsIcons/PaperPlaneOutline'
import { AvatarBox } from '@/src/components/avatar/AvatarBox'
import { DropdownMenuMobile } from '@/src/components/header/header-mob/dropdown-menu/DropdownMenu'
import { InteractionBar } from '@/src/components/interactionBar/InteractionBar'
import { TextArea } from '@/src/components/textArea/TextArea'
import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'

import s from './modalCommentsSection.module.scss'

import { Button } from '../button/Button'

// comment type
export type CommentType = {
  answerCount: number
  content: string
  createdAt: string
  from: UserType
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type UserType = {
  avatars: [{ url: string }]
  id: number
  username: string
}

type Props = {
  commentData?: CommentType
}

export const ModalCommentsSection = ({ commentData }: Props) => {
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({})

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prevLikedComments => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId],
    }))
  }

  return (
    <div className={s.commentsBox}>
      <div className={s.commentsHeader}>
        <div className={s.userAvaName}>
          <div className={s.userAva}>
            <AvatarBox size={'xs'} src={commentData?.from.avatars[0].url} />
          </div>
          <div className={s.userName}>
            <Typography size={'m'} weight={'semi-bold'}>
              {commentData?.from.username || 'UserName'}
            </Typography>
          </div>
        </div>
        <div className={s.postMenu}>{<DropdownMenuMobile items={menuDropdown} />}</div>
      </div>

      <div className={s.commentsBody}>
        {fakeComments.map(el => (
          <div className={s.usersCommentBody} key={el.id}>
            <div className={s.userAva}>
              <AvatarBox
                className={s.smallAva}
                size={'xs'}
                src={commentData?.from.avatars[0].url}
              />
            </div>
            <div className={s.userComment}>
              <Typography as={'h3'} className={s.userNameComment} size={'s'} weight={'bold'}>
                {commentData?.from.username || el.userName}
              </Typography>
              <Typography as={'span'} size={'s'} weight={'regular'}>
                {commentData?.content || el.comment}
              </Typography>
              <div className={s.userCommentBottom}>
                <Typography lineHeights={'s'} size={'xs'} weight={'regular'}>
                  {commentData?.createdAt || el.timeAgo}
                </Typography>
                <Typography lineHeights={'s'} size={'xs'} weight={'semi-bold'}>
                  {`Like: ${commentData?.likeCount || el.likeCount}`}
                </Typography>
                <Button className={s.answerButton} variant={'transparent'}>
                  {'Answer'}
                </Button>
              </div>
            </div>
            <div className={s.heartIconWrapper}>
              {likedComments[el.id] ? (
                <Heart
                  className={clsx(s.heartIcon, s.commentHeartIcon, s.red)}
                  onClick={() => handleLikeComment(el.id)}
                />
              ) : (
                <HeartOutline
                  className={clsx(s.heartIcon, s.commentHeartIcon)}
                  onClick={() => handleLikeComment(el.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={s.postActions}>
        <InteractionBar hasCommentIcon={false} />
        <div className={s.postLikes}></div>
        <div className={s.postDate}></div>
      </div>
      <div className={s.addComment}>
        <div className={s.textareaWrapper}>
          <TextArea className={s.textarea} label={''} placeholder={'Add a Comment...'} />
        </div>
        <Button variant={'transparent'}>{'Publish'}</Button>
      </div>
    </div>
  )
}

const menuDropdown: any = [
  { href: '/statistics', icon: <TrendingUpOutline />, title: 'Statistics' },
  { href: '/favorites', icon: <BookmarkOutline />, title: 'Favorites' },
  { href: '/settings', icon: <SettingsOutline />, title: 'Profile Settings' },
  { icon: <LogOutOutline />, title: 'Log Out' },
]

export const fakeComments = [
  {
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, exercitationem?',
    id: '1',
    likeCount: 3,
    timeAgo: '2 hours ago',
    userName: 'userName1',
  },
  {
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque delectus ea est hic perferendis quos!',
    id: '2',
    likeCount: 5,
    timeAgo: '5 hours ago',
    userName: 'userName2',
  },
]
