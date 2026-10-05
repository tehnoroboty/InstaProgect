import { KeyboardEvent, useState } from 'react'

import { useAddComment } from '@/src/shared/hooks/useAddComment'
import { Button } from '@/src/shared/ui/button/Button'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import clsx from 'clsx'

import s from '@/src/widgets/addCommentForm/addCommentForm.module.scss'

type Props = {
  buttonText?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  onCommentAdded?: () => void
  placeholder?: string
  postId: number
  textAreaClassName?: string
  textAreaWrapperClassName?: string
}

export const AddCommentForm = ({
  buttonText = 'Publish',
  className,
  disabled = false,
  maxLength = 300,
  onCommentAdded,
  placeholder = 'Add a Comment...',
  postId,
  textAreaClassName,
  textAreaWrapperClassName,
}: Props) => {
  const { commentText, handleChange, handleSubmit, isLoading } = useAddComment(postId)

  const [error, setError] = useState<string | undefined>(undefined)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (!error) {
        void handleSubmit(onCommentAdded)
      }
    }
  }

  const isSubmitDisabled = disabled || isLoading || !commentText.trim() || !!error

  return (
    <div className={clsx(s.addComment, className)}>
      <div className={clsx(s.textareaWrapper, textAreaWrapperClassName)}>
        <TextAreaWithValidation
          className={clsx(s.textarea, textAreaClassName)}
          disabled={disabled || isLoading}
          label={''}
          maxLength={maxLength}
          minLength={1}
          onErrorChange={setError}
          onKeyDown={handleKeyDown}
          onTextChange={handleChange}
          placeholder={placeholder}
          value={commentText}
        />
      </div>
      <Button
        className={s.btn}
        disabled={isSubmitDisabled}
        onClick={() => handleSubmit(onCommentAdded)}
        variant={'transparent'}
      >
        {isLoading ? 'Sending...' : buttonText}
      </Button>
    </div>
  )
}
