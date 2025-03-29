'use client'

import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Post } from '@/src/entities/post/types'
import { Avatar } from '@/src/entities/user/types'
import Heart from '@/src/shared/assets/componentsIcons/Heart'
import HeartOutline from '@/src/shared/assets/componentsIcons/HeartOutline'
import { timeSince } from '@/src/shared/lib/timeSince'
import { postsApi, useRemovePostMutation } from '@/src/shared/model/api/postsApi'
import { Comment } from '@/src/shared/model/api/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Dialog } from '@/src/shared/ui/dialog'
import { PostLikesBox } from '@/src/shared/ui/postLikesBox/PostLikesBox'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ConfirmationModal } from '@/src/shared/ui/сonfirmationModal/ConfirmationModal'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import { EditPost } from '@/src/widgets/editPost/EditPost'
import { InteractionBar } from '@/src/widgets/interactionBar/InteractionBar'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import s from './modalCommentsSection.module.scss'

import { Button } from '../../shared/ui/button/Button'

export type ModalCommentsSectionProps = {
  avatars?: Avatar[]
  commentsData: Comment[]
  isMyPost: boolean
  post: Post
  postPublicStatus: boolean
}

export const ModalCommentsSection = ({
  avatars,
  commentsData,
  isMyPost,
  post,
  postPublicStatus,
}: ModalCommentsSectionProps) => {
  const { avatarOwner, createdAt, description, id: postId, ownerId, userName } = post
  const [comments, setComments] = useState<Comment[]>(commentsData)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const textArea = useRef<HTMLTextAreaElement>(null)

  const [removePost, { isLoading }] = useRemovePostMutation()

  const dispatch = useDispatch()

  const router = useRouter()
  const params = useParams()

  const handleChangeHeight = () => {
    if (textArea.current) {
      textArea.current.style.height = '24px'
      const textAreaHeight = Math.min(textArea.current.scrollHeight, 120)

      textArea.current.style.height = textAreaHeight + 'px'
    }
  }

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
      <EditPost
        avatarOwner={avatarOwner}
        imgSrc={post.images[0].url}
        onExitEdit={handleExitEdit}
        postDescription={description}
        postId={postId}
        userName={userName}
      />
    )
  }

  const onRemovePost = async () => {
    await removePost({ postId, userName })
    setIsOpen(false)

    // 🔄 Очищаем кэш и загружаем первую страницу заново
    dispatch(postsApi.util.invalidateTags([{ id: userName, type: 'POSTS' }]))

    // 🔀 Переход на профиль пользователя
    router.push(`/profile/${params.userId}`, { scroll: false })
  }

  const handleConfirmClose = async () => {
    setIsOpen(false) // Закрываем Modal
    await onRemovePost()
  }

  return (
    <div className={s.commentsBox}>
      <div className={s.commentsHeader}>
        <Link href={`/profile/${ownerId}`}>
          <UserAvatarName
            url={avatarOwner}
            username={userName}
            usernameClassName={s.userAvatarName}
          />
        </Link>
        {!postPublicStatus && (
          <div className={s.postMenu}>
            {
              <DropdownPost
                isFollowedBy={false}
                isOurPost={isMyPost}
                onEdit={handleEditPost}
                onRemove={() => {
                  setIsOpen(true)
                }}
              />
            }
          </div>
        )}
      </div>

      <div className={s.commentsBody}>
        <div className={s.descriptionBox}>
          <div className={s.smallAva}>
            <Link href={`/profile/${ownerId}`}>
              <AvatarBox size={'xs'} src={avatarOwner} />
            </Link>
          </div>
          <div>
            <div className={s.userNameContent}>
              <Link className={s.userNameLink} href={`/profile/${ownerId}`}>
                <Typography as={'h3'} className={s.userName} size={'s'} weight={'bold'}>
                  {userName}
                </Typography>
              </Link>
              <Typography as={'div'} className={s.description}>
                {description}
              </Typography>
            </div>
            <Typography className={s.timeAgo} lineHeights={'s'} size={'xs'} weight={'regular'}>
              {timeSince(createdAt)}
            </Typography>
          </div>
        </div>
        {comments
          ?.map(el => (
            <div className={s.usersCommentBody} key={el.id}>
              <div className={s.usersCommentBodyBox}>
                <div className={s.userAva}>
                  <AvatarBox
                    className={s.smallAva}
                    size={'xs'}
                    src={el.from.avatars?.[0]?.url || ''}
                  />
                </div>
                <div className={s.userComment}>
                  <Typography as={'h3'} className={s.userName} size={'s'} weight={'bold'}>
                    {el.from.username}
                  </Typography>
                  <Typography
                    as={'div'}
                    className={s.userCommentTypography}
                    size={'s'}
                    weight={'regular'}
                  >
                    {el.content}
                  </Typography>
                  <div className={s.userCommentBottom}>
                    <Typography lineHeights={'s'} size={'xs'} weight={'regular'}>
                      {timeSince(el.createdAt)}
                    </Typography>
                    <Typography
                      lineHeights={'s'}
                      size={'xs'}
                      weight={'semi-bold'}
                    >{`Like: ${el.likeCount}`}</Typography>
                    <Button className={s.answerButton} variant={'transparent'}>
                      {'Answer'}
                    </Button>
                  </div>
                </div>
              </div>
              {!postPublicStatus && (
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
              )}
            </div>
          ))
          .reverse()}
      </div>
      <div className={s.postActions}>
        {!postPublicStatus && (
          <InteractionBar className={s.interactionBar} hasCommentIcon={false} />
        )}
        <PostLikesBox
          avatars={avatarsData}
          className={s.postLikesBox}
          likesCount={post.likesCount}
        />
        <div className={s.postDate}>{timeSince(createdAt)}</div>
      </div>
      {!postPublicStatus && (
        <div className={s.addComment}>
          <div className={s.textareaWrapper}>
            <TextArea
              className={s.textarea}
              label={''}
              onChange={handleChangeHeight}
              placeholder={'Add a Comment...'}
            />
          </div>
          <Button variant={'transparent'}>{'Publish'}</Button>
        </div>
      )}
      <ConfirmationModal
        modalMessage={'Are you sure you want to delete this post?'}
        modalTitle={'Delete Post'}
        onClickNo={() => setIsOpen(false)}
        onCloseModal={() => setIsOpen(false)}
        onPrimaryAction={handleConfirmClose}
        open={isOpen}
      />
    </div>
  )
}
