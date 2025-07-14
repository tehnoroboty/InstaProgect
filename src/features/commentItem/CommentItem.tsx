import { AnswersComment, Comment } from '@/src/shared/model/api/types'
import { AddAnswerForm } from '@/src/widgets/addAnswerForm/AddAnswerForm'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Button } from '@/src/shared/ui/button/Button'
import { timeSince } from '@/src/shared/lib/timeSince'
import Heart from '@/src/shared/assets/componentsIcons/Heart'
import HeartOutline from '@/src/shared/assets/componentsIcons/HeartOutline'
import clsx from 'clsx'
import s from './commentItem.module.scss'

type Props = {
  comment: Comment
  isAuth: boolean
  isLiked: boolean
  likeCount: number
  onLike: () => void
  onReplyClick: () => void
  replying: boolean
  onAnswerAdded: (answer: AnswersComment) => void
  answers: AnswersComment[]
  expanded: boolean
  toggleExpanded: () => void
  likedAnswersMap: Record<number, boolean>
  likeAnswersCounts: Record<number, number>
  onLikeAnswer: (answerId: number) => void
}

export const CommentItem = ({
  comment,
  isAuth,
  isLiked,
  likeCount,
  onLike,
  onReplyClick,
  replying,
  onAnswerAdded,
  answers,
  expanded,
  toggleExpanded,
  likedAnswersMap,
  likeAnswersCounts,
  onLikeAnswer,
}: Props) => {
  return (
    <div className={s.usersCommentBody}>
      <div className={s.usersCommentBodyBox}>
        <div className={s.userAva}>
          <AvatarBox className={s.smallAva} size="xs" src={comment.from.avatars?.[0]?.url || ''} />
        </div>
        <div className={s.userComment}>
          <Typography as="h3" className={s.userName} size="s" weight="bold">
            {comment.from.username}
          </Typography>
          <Typography as="div" className={s.userCommentTypography} size="s">
            {comment.content}
          </Typography>
          <div className={s.userCommentBottom}>
            <Typography size="xs">{timeSince(comment.createdAt)}</Typography>
            {isAuth && (
              <>
                <Typography size="xs" weight="semi-bold">{`Like: ${likeCount}`}</Typography>
                <Button variant="transparent" className={s.answerButton} onClick={onReplyClick}>
                  Answer
                </Button>
              </>
            )}
          </div>

          {isAuth && replying && (
            <AddAnswerForm
              postId={comment.postId}
              commentId={comment.id}
              onAnswerAdded={onAnswerAdded}
            />
          )}

          {answers.length > 0 && (
            <Button className={s.viewAnswersButton} variant="transparent" onClick={toggleExpanded}>
              {expanded ? `Hide Answers (${answers.length})` : `View Answers (${answers.length})`}
            </Button>
          )}

          {expanded &&
            answers.map(answer => {
              const isLikedAnswer = likedAnswersMap[answer.id] ?? answer.isLiked
              const likeCount = likeAnswersCounts[answer.id] ?? answer.likeCount
              return (
                <div key={answer.id} className={s.answer}>
                  <div className={s.userAva}>
                    <AvatarBox size="xs" src={answer.from.avatars?.[0]?.url || ''} />
                  </div>
                  <div className={s.userComment}>
                    <Typography as="h3" className={s.userName} size="s" weight="bold">
                      {answer.from.username}
                    </Typography>
                    <Typography className={s.userCommentTypography}>{answer.content}</Typography>
                    <div className={s.userCommentBottom}>
                      <Typography size="xs">{timeSince(answer.createdAt)}</Typography>
                      {isAuth && (
                        <>
                          <Typography
                            size="xs"
                            weight="semi-bold"
                          >{`Like: ${likeCount}`}</Typography>
                          <Button
                            className={s.answerButton}
                            variant="transparent"
                            onClick={onReplyClick}
                          >
                            Answer
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  {isAuth && (
                    <div className={s.heartIconWrapper}>
                      <Button
                        className={s.iconButton}
                        onClick={() => onLikeAnswer(answer.id)}
                        title={isLikedAnswer ? 'Unlike' : 'Like'}
                        variant="transparent"
                      >
                        {isLikedAnswer ? (
                          <Heart className={clsx(s.heartIcon, s.red)} />
                        ) : (
                          <HeartOutline className={clsx(s.heartIcon, s.heartOutlineIcon)} />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>

      {isAuth && (
        <div className={s.heartIconWrapper}>
          <Button
            className={s.iconButton}
            onClick={onLike}
            title={isLiked ? 'Unlike' : 'Like'}
            variant="transparent"
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
