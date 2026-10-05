import { KeyboardEvent, useState } from 'react'

import { AnswersComment } from '@/src/entities/comments/types'
import { useAddAnswer } from '@/src/shared/hooks/useAddAnswer'
import { Button } from '@/src/shared/ui/button/Button'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import clsx from 'clsx'

import s from './addAnswerForm.module.scss'

type Props = {
  buttonText?: string
  className?: string
  commentId: number
  disabled?: boolean
  maxLength?: number
  onAnswerAdded?: (result: AnswersComment) => void
  placeholder?: string
  postId: number
}

export const AddAnswerForm = ({
  buttonText = 'Publish',
  className,
  commentId,
  disabled = false,
  maxLength = 300,
  onAnswerAdded,
  placeholder = 'Add an Answer...',
  postId,
}: Props) => {
  const { commentText, handleChange, handleSubmit, isLoading } = useAddAnswer(postId, commentId)

  const [error, setError] = useState<string | undefined>()

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      const result = await handleSubmit()

      if (result) {
        onAnswerAdded?.(result)
      }
    }
  }

  const isSubmitDisabled = disabled || isLoading || !commentText.trim() || !!error

  return (
    <div className={clsx(s.addComment, className)}>
      <div className={s.textareaWrapper}>
        <TextAreaWithValidation
          className={s.textarea}
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
        onClick={async () => {
          const result = await handleSubmit()

          if (result) {
            onAnswerAdded?.(result)
          }
        }}
        variant={'transparent'}
      >
        {isLoading ? 'Sending...' : buttonText}
      </Button>
    </div>
  )
}
