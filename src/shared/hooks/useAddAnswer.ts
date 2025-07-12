import { useState } from 'react'
import { useAddAnswerMutation } from '@/src/shared/model/api/postsApi'
import { AnswersComment, CustomerError } from '@/src/shared/model/api/types'
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
    if (!commentText.trim()) return null

    try {
      const result = await addAnswer({ postId, commentId, content: commentText }).unwrap()

      setCommentText('')
      return result
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0].message || error.data?.error || 'Failed to add comment'

      dispatch(setAppError({ error: errorMessage }))
      return null
    }
  }

  return { commentText, handleChange, handleSubmit, isLoading }
}
