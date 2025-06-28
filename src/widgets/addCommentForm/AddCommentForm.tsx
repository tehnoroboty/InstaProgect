import { KeyboardEvent } from 'react'

import { useAddComment } from '@/src/shared/hooks/useAddComment'
import { Button } from '@/src/shared/ui/button/Button'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import clsx from 'clsx'

import s from '@/src/widgets/addCommentForm/addCommentForm.module.scss'

type Props = {
  buttonText?: string
  className?: string
  onCommentAdded?: () => void // Колбэк после успешного добавления
  placeholder?: string
  postId: number
}

export const AddCommentForm = ({
  buttonText = 'Publish',
  className,
  onCommentAdded,
  placeholder = 'Add a Comment...',
  postId,
}: Props) => {
  const { commentText, handleChange, handleSubmit, isLoading } = useAddComment(postId)

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      try {
        await handleSubmit(onCommentAdded)
      } catch (error) {
        console.error('Failed to submit:', error)
      }
    }
  }

  return (
    <div className={clsx(s.addComment, className)}>
      <div className={s.textareaWrapper}>
        <TextArea
          className={s.textarea}
          label={''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={commentText}
        />
      </div>
      <Button
        disabled={isLoading}
        onClick={() => handleSubmit(onCommentAdded)}
        variant={'transparent'}
      >
        {buttonText}
      </Button>
    </div>
  )
}
