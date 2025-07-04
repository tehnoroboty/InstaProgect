import { KeyboardEvent } from 'react'

import { useAddComment } from '@/src/shared/hooks/useAddComment'
import { Button } from '@/src/shared/ui/button/Button'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import clsx from 'clsx'

import s from '@/src/widgets/addCommentForm/addCommentForm.module.scss'

type Props = {
  buttonText?: string
  className?: string
  disabled?: boolean
  onCommentAdded?: () => void // Колбэк после успешного добавления
  placeholder?: string
  postId: number
}

export const AddCommentForm = ({
  buttonText = 'Publish',
  className,
  disabled = false,
  onCommentAdded,
  placeholder = 'Add a Comment...',
  postId,
}: Props) => {
  const { commentText, handleChange, handleSubmit, isLoading } = useAddComment(postId)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      void handleSubmit(onCommentAdded)
    }
  }

  const isSubmitDisabled = disabled || isLoading || !commentText.trim()

  return (
    <div className={clsx(s.addComment, className)}>
      <div className={s.textareaWrapper}>
        <TextArea
          className={s.textarea}
          disabled={disabled || isLoading}
          label={''}
          maxLength={300}
          minLength={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={commentText}
        />
      </div>
      <Button
        disabled={isSubmitDisabled}
        onClick={() => handleSubmit(onCommentAdded)}
        variant={'transparent'}
      >
        {buttonText}
      </Button>
    </div>
  )
}
