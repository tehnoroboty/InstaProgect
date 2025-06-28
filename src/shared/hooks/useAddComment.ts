import { ChangeEvent, useState } from 'react'

import { useCreateNewCommentMutation } from '@/src/shared/model/api/commentsAnswersApi'

export const useAddComment = (postId: number) => {
  const [commentText, setCommentText] = useState('')

  const [createNewComment, { isLoading }] = useCreateNewCommentMutation()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }

  const handleSubmit = async (onSuccess?: () => void) => {
    if (!commentText.trim()) {
      return
    }

    try {
      await createNewComment({ content: commentText, postId }).unwrap()

      setCommentText('')
      onSuccess?.()
    } catch (err) {
      console.error('Error adding comment:', err)
      // dispatch(setAppError(err.data))
    }
  }

  return {
    commentText,
    handleChange,
    handleSubmit,
    isLoading,
  }
}
