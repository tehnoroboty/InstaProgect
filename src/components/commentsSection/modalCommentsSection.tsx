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
import { UserAvatarName } from '@/src/components/userAvatarName/UserAvatarName'
import clsx from 'clsx'

import s from './modalCommentsSection.module.scss'

import { Button } from '../button/Button'

// post type
type Image = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type Owner = {
  firstName: string
  lastName: string
}

type Post = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: Image[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

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
  avatars: { url: string }[]
  id: number
  username: string
}

type Props = {
  commentsData?: CommentType[]
  post: Post
}

export const ModalCommentsSection = ({ commentsData = fakeComments, post }: Props) => {
  // Состояние для комментариев
  const [comments, setComments] = useState<CommentType[]>(commentsData)

  const handleLikeComment = (commentId: number) => {
    // Обновляем состояние лайка для конкретного комментария
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
            }
          : comment
      )
    )
  }

  return (
    <div className={s.commentsBox}>
      <div className={s.commentsHeader}>
        <UserAvatarName url={post?.images?.[0]?.url} username={post?.userName} />
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
        {comments?.map(el => (
          <div className={s.usersCommentBody} key={el.id}>
            <div className={s.userAva}>
              <AvatarBox className={s.smallAva} size={'xs'} src={el.from.avatars[0].url} />
            </div>
            <div className={s.userComment}>
              <Typography as={'h3'} className={s.userNameComment} size={'s'} weight={'bold'}>
                {el.from.username}
              </Typography>
              <Typography as={'span'} size={'s'} weight={'regular'}>
                {el.content}
              </Typography>
              <div className={s.userCommentBottom}>
                <Typography lineHeights={'s'} size={'xs'} weight={'regular'}>
                  {el.createdAt}
                </Typography>
                <Typography lineHeights={'s'} size={'xs'} weight={'semi-bold'}>
                  {`Like: ${el.likeCount}`}
                </Typography>
                <Button className={s.answerButton} variant={'transparent'}>
                  {'Answer'}
                </Button>
              </div>
            </div>
            <div className={s.heartIconWrapper}>
              {el.isLiked ? (
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
        <div className={s.postDate}>{post?.createdAt}</div>
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

const fakeComments = [
  {
    answerCount: 12,
    content: 'HGFHGFHGFHGFH',
    createdAt: '12',
    from: {
      avatars: [{ url: 'http://avatar1' }],
      id: 1,
      username: 'Name 1',
    },
    id: 1,
    isLiked: true,
    likeCount: 17,
    postId: 9,
  },
  {
    answerCount: 12,
    content: 'dfghdfhdfh',
    createdAt: '12',
    from: {
      avatars: [{ url: 'http://avatar2' }],
      id: 2,
      username: 'Name 2',
    },
    id: 2,
    isLiked: true,
    likeCount: 17,
    postId: 9,
  },
  {
    answerCount: 12,
    content: 'dfghdfgdfgdf',
    createdAt: '12',
    from: {
      avatars: [{ url: 'http://avatar3' }],
      id: 3,
      username: 'Name 3',
    },
    id: 3,
    isLiked: false,
    likeCount: 17,
    postId: 9,
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
