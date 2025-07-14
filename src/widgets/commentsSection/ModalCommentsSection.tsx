'use client'

import { useMemo, useState } from 'react'
import { Post } from '@/src/entities/post/types'
import { timeSince } from '@/src/shared/lib/timeSince'
import { useDeletePostMutation, useGetCommentsQuery } from '@/src/shared/model/api/postsApi'
import { AnswersComment, Avatar, Comment } from '@/src/shared/model/api/types'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { PostLikesBox } from '@/src/shared/ui/postLikesBox/PostLikesBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { AddCommentForm } from '@/src/widgets/addCommentForm/AddCommentForm'
import { DropdownPost } from '@/src/widgets/dropdownPost/DropdownPost'
import { EditPost } from '@/src/widgets/editPost/EditPost'
import { ConfirmationModal } from '@/src/widgets/editPost/сonfirmationModal/ConfirmationModal'
import { InteractionBar } from '@/src/widgets/interactionBar/InteractionBar'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import s from './modalCommentsSection.module.scss'
import { useSelector } from 'react-redux'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { sortComments } from '@/src/shared/lib/sortComments'
import { CommentItem } from '@/src/features/commentItem/CommentItem'

export type ModalCommentsSectionProps = {
  avatars?: Avatar[]
  commentsData?: Comment[]
  isAuth?: boolean
  isMyPost?: boolean
  post: Post
}

export const ModalCommentsSection = ({
  avatars,
  isAuth = false,
  isMyPost = false,
  post,
}: ModalCommentsSectionProps) => {
  const { avatarOwner, createdAt, description, id: postId, ownerId, userName } = post

  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null)
  const [answersMap, setAnswersMap] = useState<Record<number, AnswersComment[]>>({})
  const [expandedAnswersMap, setExpandedAnswersMap] = useState<Record<number, boolean>>({})

  const { data: commentsResponse } = useGetCommentsQuery(postId)
  const commentsRaw = commentsResponse?.items ?? []

  const currentUserId = useSelector(selectUserId)

  const comments = useMemo(() => {
    if (!currentUserId) return commentsRaw
    return sortComments(commentsRaw, currentUserId)
  }, [commentsRaw, currentUserId])

  const [likedCommentsMap, setLikedCommentsMap] = useState<Record<number, boolean>>({})
  const [likeCommentsCounts, setLikeCommentsCounts] = useState<Record<number, number>>({})
  const [likedAnswersMap, setLikedAnswersMap] = useState<Record<number, boolean>>({})
  const [likeAnswersCounts, setLikeAnswersCounts] = useState<Record<number, number>>({})

  const [deletePost] = useDeletePostMutation()
  const router = useRouter()
  const params = useParams<{ userId: string }>()

  const handleLikeComment = (commentId: number) => {
    const comment = comments.find(c => c.id === commentId)
    const isLiked = likedCommentsMap[commentId] ?? comment?.isLiked
    const likeCount = likeCommentsCounts[commentId] ?? comment?.likeCount ?? 0

    if (!comment) return

    setLikedCommentsMap(prev => ({ ...prev, [commentId]: !isLiked }))
    setLikeCommentsCounts(prev => ({
      ...prev,
      [commentId]: isLiked ? likeCount - 1 : likeCount + 1,
    }))
  }

  const handleLikeAnswer = (answerId: number) => {
    const answer = Object.values(answersMap)
      .flat()
      .find(a => a.id === answerId)

    const isLiked = likedAnswersMap[answerId] ?? answer?.isLiked
    const likeCount = likeAnswersCounts[answerId] ?? answer?.likeCount ?? 0

    setLikedAnswersMap(prev => ({ ...prev, [answerId]: !isLiked }))
    setLikeAnswersCounts(prev => ({
      ...prev,
      [answerId]: isLiked ? likeCount - 1 : likeCount + 1,
    }))
  }

  const avatarsData =
    avatars ??
    comments.map(
      item =>
        item.from.avatars?.[0] || {
          createdAt: '2025-02-19T11:58:19.531Z',
          fileSize: 300,
          height: 300,
          url: 'https://example.com/image1.jpg',
          width: 300,
        }
    )

  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
          <CommentItem
            key={comment.id}
            comment={comment}
            isAuth={isAuth}
            isLiked={likedCommentsMap[comment.id] ?? comment.isLiked}
            likeCount={likeCommentsCounts[comment.id] ?? comment.likeCount}
            onLike={() => handleLikeComment(comment.id)}
            onReplyClick={() =>
              setReplyingToCommentId(prev => (prev === comment.id ? null : comment.id))
            }
            replying={replyingToCommentId === comment.id}
            onAnswerAdded={newAnswer => {
              setAnswersMap(prev => ({
                ...prev,
                [comment.id]: [newAnswer, ...(prev[comment.id] || [])],
              }))
              setExpandedAnswersMap(prev => ({
                ...prev,
                [comment.id]: true,
              }))
              setReplyingToCommentId(null)
            }}
            answers={answersMap[comment.id] ?? []}
            expanded={expandedAnswersMap[comment.id]}
            toggleExpanded={() => toggleAnswersVisibility(comment.id)}
            likedAnswersMap={likedAnswersMap}
            likeAnswersCounts={likeAnswersCounts}
            onLikeAnswer={handleLikeAnswer}
          />
        ))}
      </div>
      <div className={s.postActions}>
        <InteractionBar className={s.interactionBar} hasCommentIcon={false} />
        <PostLikesBox
          avatars={avatarsData}
          className={s.postLikesBox}
          isAuth={isAuth}
          likesCount={post.likesCount}
        />
        <div className={s.postDate}>{timeSince(createdAt)}</div>
      </div>
      <div className={clsx({ [s.withBorder]: isAuth })}>
        {isAuth && <AddCommentForm postId={postId} />}
      </div>
    </div>
  )
}
