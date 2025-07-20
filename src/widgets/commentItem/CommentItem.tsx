import Heart from '@/src/shared/assets/componentsIcons/Heart'
import HeartOutline from '@/src/shared/assets/componentsIcons/HeartOutline'
import { timeSince } from '@/src/shared/lib/timeSince'
import { AnswersComment, Comment } from '@/src/shared/model/api/types'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { AddAnswerForm } from '@/src/widgets/addAnswerForm/AddAnswerForm'
import { AnswerItem } from '@/src/widgets/answerItem/AnswerItem'
import clsx from 'clsx'

import s from './commentItem.module.scss'

type Props = {
  answers: AnswersComment[]
  comment: Comment
  expanded: boolean
  isAuth: boolean
  isLiked: boolean
  likeCount: number
  onAnswerAdded: (answer: AnswersComment) => void
  onLike: () => void
  onLikeAnswer: (answerId: number, isLiked: boolean) => void
  onReplyClick: () => void
  replying: boolean
  toggleExpanded: () => void
}

export const CommentItem = ({
  answers,
  comment,
  expanded,
  isAuth,
  isLiked,
  likeCount,
  onAnswerAdded,
  onLike,
  onLikeAnswer,
  onReplyClick,
  replying,
  toggleExpanded,
}: Props) => {
  const currentUserId = useAppSelector(selectUserId)

  return (
    <div className={s.usersCommentBody}>
      <div className={s.usersCommentBodyBox}>
        <div className={s.userAva}>
          <AvatarBox
            className={s.smallAva}
            size={'xs'}
            src={comment.from.avatars?.[0]?.url || ''}
          />
        </div>
        <div className={s.userComment}>
          <Typography as={'h3'} className={s.userName} size={'s'} weight={'bold'}>
            {comment.from.username}
          </Typography>
          <Typography as={'div'} className={s.userCommentTypography} size={'s'}>
            {comment.content}
          </Typography>
          <div className={s.userCommentBottom}>
            <Typography size={'xs'}>{timeSince(comment.createdAt)}</Typography>
            {isAuth && (
              <>
                <Typography size={'xs'} weight={'semi-bold'}>{`Like: ${likeCount}`}</Typography>
                <Button className={s.answerButton} onClick={onReplyClick} variant={'transparent'}>
                  Answer
                </Button>
              </>
            )}
          </div>

          {isAuth && replying && (
            <AddAnswerForm
              commentId={comment.id}
              onAnswerAdded={onAnswerAdded}
              postId={comment.postId}
            />
          )}

          {answers.length > 0 && (
            <Button
              className={s.viewAnswersButton}
              onClick={toggleExpanded}
              variant={'transparent'}
            >
              {expanded ? `Hide Answers (${answers.length})` : `View Answers (${answers.length})`}
            </Button>
          )}

          {expanded &&
            answers.map(answer => (
              <AnswerItem
                answer={answer}
                commentId={comment.id}
                currentUserId={currentUserId}
                isAuth={isAuth}
                key={answer.id}
                onLikeAnswer={onLikeAnswer}
                onReplyClick={onReplyClick}
                postId={comment.postId}
              />
            ))}
        </div>
      </div>

      {isAuth && (
        <div className={s.heartIconWrapper}>
          <Button
            className={s.iconButton}
            onClick={onLike}
            title={isLiked ? 'Unlike' : 'Like'}
            variant={'transparent'}
          >
            {isLiked ? (
              <Heart className={clsx(s.heartIcon, s.red)} />
            ) : (
              <HeartOutline className={clsx(s.heartIcon, s.heartOutlineIcon)} />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
