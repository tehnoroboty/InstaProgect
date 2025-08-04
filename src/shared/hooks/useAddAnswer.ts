import { useState } from 'react'

import { AnswersComment } from '@/src/entities/comments/types'
import { CustomerError } from '@/src/entities/errors/types'
import { useAddAnswerMutation } from '@/src/shared/model/api/commentsAnswersApi'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'

export const useAddAnswer = (postId: number, commentId: number) => {
  const [commentText, setCommentText] = useState('')
  const [addAnswer, { isLoading }] = useAddAnswerMutation()

  const dispatch = useAppDispatch()

  const handleChange = (value: string) => {
    setCommentText(value)
  }

  const handleSubmit = async (): Promise<AnswersComment | null> => {
    if (!commentText.trim()) {
      return null
    }

    try {
      const result = await addAnswer({ commentId, content: commentText, postId }).unwrap()

      setCommentText('')

      return result
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0].message || error.data?.error || 'Failed to add comments'

      dispatch(setAppError({ error: errorMessage }))

      return null
    }
  }

  return { commentText, handleChange, handleSubmit, isLoading }
}
