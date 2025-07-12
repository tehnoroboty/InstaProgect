import { KeyboardEvent, useState } from 'react'

import { useAddAnswer } from '@/src/shared/hooks/useAddAnswer'
import { Button } from '@/src/shared/ui/button/Button'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import clsx from 'clsx'

import s from './addAnswerForm.module.scss'
import { AnswersComment } from '@/src/shared/model/api/types'

type Props = {
  buttonText?: string
  className?: string
  disabled?: boolean
  maxLength?: number
  onAnswerAdded?: (result: AnswersComment) => void // Колбэк после успешного добавления
  placeholder?: string
  postId: number
  commentId: number
}

export const AddAnswerForm = ({
  buttonText = 'Publish',
  className,
  disabled = false,
  maxLength = 300,
  onAnswerAdded,
  placeholder = 'Add an Answer...',
  postId,
  commentId,
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
