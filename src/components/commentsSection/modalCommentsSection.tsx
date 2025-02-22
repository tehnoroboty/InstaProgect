'use client'

import { useState } from 'react'

import { CopyOutline, PersonRemoveOutline } from '@/src/assets/componentsIcons'
import Heart from '@/src/assets/componentsIcons/Heart'
import HeartOutline from '@/src/assets/componentsIcons/HeartOutline'
import { AvatarBox } from '@/src/components/avatar/AvatarBox'
import { DropdownMenuMobile } from '@/src/components/header/header-mob/dropdown-menu/DropdownMenu'
import { InteractionBar } from '@/src/components/interactionBar/InteractionBar'
import { PostLikesBox } from '@/src/components/postLikesBox/PostLikesBox'
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
        <div className={s.postMenu}>
          {
            <DropdownMenuMobile
              items={[
                { icon: PersonRemoveOutline, title: 'Unfollow' },
                { icon: CopyOutline, title: 'Copy Link' },
              ]}
            />
          }
        </div>
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
                  tabIndex={0}
                />
              ) : (
                <HeartOutline
                  className={clsx(s.heartIcon, s.commentHeartIcon)}
                  onClick={() => handleLikeComment(el.id)}
                  tabIndex={0}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={s.postActions}>
        <InteractionBar className={s.interactionBar} hasCommentIcon={false} />
        <PostLikesBox avatars={fakeAvatars} className={s.postLikesBox} likesCount={10} />
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

const fakeAvatars = [
  {
    createdAt: '2025-02-19T11:58:19.531Z',
    fileSize: 300,
    height: 300,
    url: 'https://example.com/image1.jpg',
    width: 300,
  },
  {
    createdAt: '2025-02-19T11:58:19.531Z',
    fileSize: 300,
    height: 300,
    url: 'https://example.com/image2.jpg',
    width: 300,
  },
  {
    createdAt: '2025-02-19T11:58:19.531Z',
    fileSize: 300,
    height: 300,
    url: 'https://example.com/image3.jpg',
    width: 300,
  },
  {
    createdAt: '2025-02-19T11:58:19.531Z',
    fileSize: 300,
    height: 300,
    url: 'https://example.com/image4.jpg',
    width: 300,
  },
  {
    createdAt: '2025-02-19T11:58:19.531Z',
    fileSize: 300,
    height: 300,
    url: 'https://example.com/image5.jpg',
    width: 300,
  },
]
