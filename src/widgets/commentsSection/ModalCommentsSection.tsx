'use client'

import { useState } from 'react'

import Heart from '@/src/shared/assets/componentsIcons/Heart'
import HeartOutline from '@/src/shared/assets/componentsIcons/HeartOutline'
import { timeSince } from '@/src/shared/lib/timeSince'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { PostLikesBox } from '@/src/shared/ui/postLikesBox/PostLikesBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import { EditPost } from '@/src/widgets/editPost/EditPost'
import { InteractionBar } from '@/src/widgets/interactionBar/InteractionBar'
import clsx from 'clsx'

import s from './modalCommentsSection.module.scss'

import { Button } from '../../shared/ui/button/Button'

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

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type ModalCommentsSectionProps = {
  avatars?: Avatar[]
  commentsData: CommentType[]
  post: Post
  postId: number
}

export const ModalCommentsSection = ({
  avatars,
  commentsData,
  post,
  postId,
}: ModalCommentsSectionProps) => {
  const { avatarOwner, createdAt, userName } = post
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

  const avatarsData =
    avatars ??
    commentsData.map(item => {
      if (item.from.avatars.length < 1) {
        return {
          createdAt: '2025-02-19T11:58:19.531Z',
          fileSize: 300,
          height: 300,
          url: 'https://example.com/image1.jpg',
          width: 300,
        }
      } else {
        return item.from.avatars[0]
      }
    })

  const [isEditing, setIsEditing] = useState(false)

  const handleEditPost = () => {
    setIsEditing(true)
  }

  const handleExitEdit = () => {
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <EditPost onExitEdit={handleExitEdit} postDescription={post.description} postId={postId} />
    )
  }

  return (
    <div className={s.commentsBox}>
      <div className={s.commentsHeader}>
        <UserAvatarName url={avatarOwner} username={userName} />
        <div className={s.postMenu}>
          {<DropdownPost isFollowedBy={false} isOurPost onEdit={handleEditPost} />}
        </div>
      </div>

      <div className={s.commentsBody}>
        {commentsData
          ?.map(el => (
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
                    {timeSince(el.createdAt)}
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
                  <Button
                    className={s.iconButton}
                    onClick={() => handleLikeComment(el.id)}
                    title={'Unlike'}
                    variant={'transparent'}
                  >
                    <Heart className={clsx(s.heartIcon, s.red)} />
                  </Button>
                ) : (
                  <Button
                    className={s.iconButton}
                    onClick={() => handleLikeComment(el.id)}
                    title={'Like'}
                    variant={'transparent'}
                  >
                    <HeartOutline className={clsx(s.heartIcon, s.heartOutlineIcon)} />
                  </Button>
                )}
              </div>
            </div>
          ))
          .reverse()}
      </div>
      <div className={s.postActions}>
        <InteractionBar className={s.interactionBar} hasCommentIcon={false} />
        <PostLikesBox
          avatars={avatarsData}
          className={s.postLikesBox}
          likesCount={post.likesCount}
        />
        <div className={s.postDate}>{timeSince(createdAt)}</div>
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
