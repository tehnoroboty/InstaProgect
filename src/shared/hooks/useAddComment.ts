import { ChangeEvent, useState } from 'react'

import { useCreateNewCommentMutation } from '@/src/shared/model/api/commentsAnswersApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'

export const useAddComment = (postId: number) => {
  const [commentText, setCommentText] = useState('')
  const dispatch = useAppDispatch()

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
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0].message

      dispatch(setAppError({ error: errorMessage }))
    }
  }

  return {
    commentText,
    handleChange,
    handleSubmit,
    isLoading,
  }
}
