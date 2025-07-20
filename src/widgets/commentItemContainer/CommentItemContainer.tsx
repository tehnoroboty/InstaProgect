import { useGetCommentLikesQuery } from '@/src/shared/model/api/postsApi'
import { AnswersComment, Comment, LikeStatus } from '@/src/shared/model/api/types'
import { CommentItem } from '@/src/widgets/commentItem/CommentItem'

type Props = {
  answersMap: Record<number, AnswersComment[]>
  comment: Comment
  currentUserId: null | number
  expandedAnswersMap: Record<number, boolean>

  handleLikeAnswer: (commentId: number, answerId: number, status: LikeStatus) => void
  handleLikeComment: (commentId: number, status: LikeStatus) => void
  isAuth: boolean

  onAnswerAdded: (commentId: number, answer: AnswersComment) => void
  postId: number
  replyingToCommentId: null | number

  setReplyingToCommentId: (value: null | number) => void
  toggleAnswersVisibility: (commentId: number) => void
}

export const CommentItemContainer = ({
  answersMap,
  comment,
  currentUserId,
  expandedAnswersMap,
  handleLikeAnswer,
  handleLikeComment,
  isAuth,
  onAnswerAdded,
  postId,
  replyingToCommentId,
  setReplyingToCommentId,
  toggleAnswersVisibility,
}: Props) => {
  {
    const { data: commentLikes } = useGetCommentLikesQuery({
      commentId: comment.id,
      postId,
    })

    const likeCount = commentLikes?.items?.length ?? comment.likeCount
    const isLiked =
      commentLikes?.items?.some(like => like.userId === currentUserId) ?? comment.isLiked

    return (
      <CommentItem
        answers={answersMap[comment.id] ?? []}
        comment={comment}
        expanded={expandedAnswersMap[comment.id]}
        isAuth={isAuth}
        isLiked={isLiked}
        key={comment.id}
        likeCount={likeCount}
        onAnswerAdded={answer => {
          onAnswerAdded(comment.id, answer)
          if (replyingToCommentId === comment.id) {
            setReplyingToCommentId(null)
          }
          if (!expandedAnswersMap[comment.id]) {
            toggleAnswersVisibility(comment.id)
          }
        }}
        onLike={() => handleLikeComment(comment.id, isLiked ? 'LIKE' : 'NONE')}
        onLikeAnswer={(answerId, isLiked) =>
          handleLikeAnswer(comment.id, answerId, isLiked ? 'LIKE' : 'NONE')
        }
        onReplyClick={() => setReplyingToCommentId(comment.id)}
        replying={replyingToCommentId === comment.id}
        toggleExpanded={() => toggleAnswersVisibility(comment.id)}
      />
    )
  }
}
