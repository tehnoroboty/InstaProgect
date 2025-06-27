import { ChangeEvent, useState } from 'react'

import { useCreateNewCommentMutation } from '@/src/shared/model/api/commentsAnswersApi'

export const useAddComment = (postId: number) => {
  const [commentText, setCommentText] = useState('')

  const [createNewComment, { isError, isLoading }] = useCreateNewCommentMutation()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      return
    }

    try {
      await createNewComment({ content: commentText, postId }).unwrap()

      setCommentText('')
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  return {
    commentText,
    handleChange,
    handleSubmit,
    isError,
    isLoading,
  }
}
