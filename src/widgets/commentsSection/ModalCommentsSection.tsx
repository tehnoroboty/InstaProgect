'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { AnswersComment, Comment } from '@/src/entities/comments/types'
import { CustomerError } from '@/src/entities/errors/types'
import { LikeStatus } from '@/src/entities/likes/types'
import { Post } from '@/src/entities/post/types'
import { sortComments } from '@/src/shared/lib/sortComments'
import { timeSince } from '@/src/shared/lib/timeSince'
import {
  postsApi,
  useDeletePostMutation,
  useGetCommentsQuery,
  useUpdateAnswerLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
} from '@/src/shared/model/api/postsApi'
import { selectUserId, setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { PostLikesBox } from '@/src/shared/ui/postLikesBox/PostLikesBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { AddCommentForm } from '@/src/widgets/addCommentForm/AddCommentForm'
import { CommentItemContainer } from '@/src/widgets/commentItemContainer/CommentItemContainer'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import { EditPost } from '@/src/widgets/editPost/EditPost'
import { ConfirmationModal } from '@/src/widgets/editPost/сonfirmationModal/ConfirmationModal'
import { InteractionBar } from '@/src/widgets/interactionBar/InteractionBar'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import s from './modalCommentsSection.module.scss'

export type ModalCommentsSectionProps = {
  commentsData?: Comment[]
  isAuth?: boolean
  isMyPost?: boolean
  post: Post
}

export const ModalCommentsSection = ({
  isAuth = false,
  isMyPost = false,
  post,
}: ModalCommentsSectionProps) => {
  const dispatch = useAppDispatch()

  const { avatarOwner, createdAt, description, id: postId, ownerId, userName } = post

  const [replyingToCommentId, setReplyingToCommentId] = useState<null | number>(null)
  const [answersMap, setAnswersMap] = useState<Record<number, AnswersComment[]>>({})
  const [expandedAnswersMap, setExpandedAnswersMap] = useState<Record<number, boolean>>({})

  const { data: commentsResponse } = useGetCommentsQuery(postId)
  const commentsRaw = commentsResponse?.items ?? []

  const currentUserId = useSelector(selectUserId)

  useEffect(() => {
    const fetchAnswers = async () => {
      const promises = commentsRaw.map(comment =>
        dispatch(
          postsApi.endpoints.getCommentAnswers.initiate({
            commentId: comment.id,
            postId,
          })
        ).unwrap()
      )

      try {
        const responses = await Promise.all(promises)
        const answersObj: Record<number, AnswersComment[]> = {}

        responses.forEach((res, index) => {
          answersObj[commentsRaw[index].id] = res.items
        })

        setAnswersMap(answersObj)
      } catch (err) {
        const error = err as CustomerError
        const errorMessage =
          error.data?.messages[0].message || error.data?.error || 'Error loading answers'

        dispatch(setAppError({ error: errorMessage }))
      }
    }

    if (commentsRaw.length) {
      fetchAnswers()
    }
  }, [commentsRaw, dispatch, postId])

  const comments = useMemo(() => {
    if (!currentUserId) {
      return commentsRaw
    }

    return sortComments(commentsRaw, currentUserId)
  }, [commentsRaw, currentUserId])

  const [deletePost] = useDeletePostMutation()
  const router = useRouter()
  const params = useParams<{ userId: string }>()

  const [updateCommentLikeStatus] = useUpdateCommentLikeStatusMutation()

  const handleLikeComment = async (commentId: number, currentStatus: LikeStatus) => {
    const nextStatus: LikeStatus = currentStatus === 'LIKE' ? 'NONE' : 'LIKE'

    try {
      await updateCommentLikeStatus({ commentId, likeStatus: nextStatus, postId }).unwrap()
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0].message || error.data?.error || 'The comments has not been found'

      dispatch(setAppError({ error: errorMessage }))
    }
  }

  const [updateAnswerLikeStatus] = useUpdateAnswerLikeStatusMutation()

  const handleLikeAnswer = async (
    commentId: number,
    answerId: number,
    currentStatus: LikeStatus
  ) => {
    const nextStatus: LikeStatus = currentStatus === 'LIKE' ? 'NONE' : 'LIKE'

    try {
      await updateAnswerLikeStatus({ answerId, commentId, likeStatus: nextStatus, postId }).unwrap()
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0].message || error.data?.error || 'The answer has not been found'

      dispatch(setAppError({ error: errorMessage }))
    }
  }

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleAnswerAdded = (commentId: number, answer: AnswersComment) => {
    setAnswersMap(prev => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), answer],
    }))
  }

  const handleEditPost = () => {
    setIsEditing(true)
  }
  const handleDeletePost = () => {
    setIsDeleting(true)
  }

  const handleExitEdit = () => {
    setIsEditing(false)
  }

  const onDeletePost = async () => {
    await deletePost({ postId, userId: Number(params.userId) }).unwrap()
    setIsDeleting(false)
    router.push(`/profile/${params.userId}`, { scroll: false })
  }

  const toggleAnswersVisibility = (commentId: number) => {
    setExpandedAnswersMap(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
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

  if (isDeleting) {
    return (
      <ConfirmationModal
        modalMessage={'Are you sure you want to delete this post?'}
        modalTitle={'Delete Post'}
        onClickNo={() => setIsDeleting(false)}
        onCloseModal={() => setIsDeleting(false)}
        onCloseParentModal={onDeletePost}
        open={isDeleting}
      />
    )
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
        {isAuth && (
          <div className={s.postMenu}>
            {
              <DropdownPost
                isFollowedBy={false}
                isOurPost={isMyPost}
                onDelete={handleDeletePost}
                onEdit={handleEditPost}
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
        {comments.map(comment => (
          <CommentItemContainer
            answersMap={answersMap}
            comment={comment}
            currentUserId={currentUserId}
            expandedAnswersMap={expandedAnswersMap}
            handleLikeAnswer={handleLikeAnswer}
            handleLikeComment={handleLikeComment}
            isAuth={isAuth}
            key={comment.id}
            onAnswerAdded={handleAnswerAdded}
            postId={postId}
            replyingToCommentId={replyingToCommentId}
            setReplyingToCommentId={setReplyingToCommentId}
            toggleAnswersVisibility={toggleAnswersVisibility}
          />
        ))}
      </div>
      <div className={s.postActions}>
        {isAuth && (
          <InteractionBar className={s.interactionBar} hasCommentIcon={false} postId={postId} />
        )}
        <PostLikesBox className={s.postLikesBox} postId={postId} />
        <div className={s.postDate}>{timeSince(createdAt)}</div>
      </div>
      <div className={clsx({ [s.withBorder]: isAuth })}>
        {isAuth && <AddCommentForm postId={postId} />}
      </div>
    </div>
  )
}
