import { AnswersComment } from '@/src/entities/comments/types'
import Heart from '@/src/shared/assets/componentsIcons/Heart'
import HeartOutline from '@/src/shared/assets/componentsIcons/HeartOutline'
import { timeSince } from '@/src/shared/lib/timeSince'
import { useGetAnswerLikesQuery } from '@/src/shared/model/api/commentsAnswersApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './answerItem.module.scss'

type Props = {
  answer: AnswersComment
  commentId: number
  currentUserId: null | number
  isAuth: boolean
  onLikeAnswer: (answerId: number, isLiked: boolean) => void
  onReplyClick: () => void
  postId: number
}

export const AnswerItem = ({
  answer,
  commentId,
  currentUserId,
  isAuth,
  onLikeAnswer,
  onReplyClick,
  postId,
}: Props) => {
  const { data: likesData } = useGetAnswerLikesQuery({
    answerId: answer.id,
    commentId: commentId,
    postId: postId,
  })

  const isLikedAnswer = likesData?.items.some(user => user.userId === currentUserId) ?? false
  const likeCount = likesData?.items.length ?? 0

  return (
    <div className={s.answer} key={answer.id}>
      <div className={s.userAva}>
        <AvatarBox size={'xs'} src={answer.from.avatars?.[0]?.url || ''} />
      </div>
      <div className={s.userComment}>
        <Typography as={'h3'} className={s.userName} size={'s'} weight={'bold'}>
          {answer.from.username}
        </Typography>
        <Typography className={s.userCommentTypography}>{answer.content}</Typography>
        <div className={s.userCommentBottom}>
          <Typography size={'xs'}>{timeSince(answer.createdAt)}</Typography>
          {isAuth && (
            <>
              <Typography size={'xs'} weight={'semi-bold'}>{`Like: ${likeCount}`}</Typography>
              <Button className={s.answerButton} onClick={onReplyClick} variant={'transparent'}>
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
            onClick={() => onLikeAnswer(answer.id, isLikedAnswer)}
            title={isLikedAnswer ? 'Unlike' : 'Like'}
            variant={'transparent'}
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
}
