'use client'
import React, { ChangeEvent, ComponentProps, forwardRef } from 'react'

import { TextArea } from '@/src/shared/ui/textArea/TextArea'

type Props = {
  error?: string
  maxLength: number
  onErrorChange: (error: string | undefined) => void
  onTextChange: (text: string) => void
  value?: string
} & Omit<ComponentProps<typeof TextArea>, 'onChange'>

export const TextAreaWithValidation = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { error, maxLength, onErrorChange, onTextChange, value, ...rest } = props

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value

    onTextChange(newValue)

    const newError =
      newValue.length > maxLength
        ? `The maximum length should be no more than ${maxLength} characters`
        : undefined

    onErrorChange(newError)
  }

  return (
    <TextArea
      {...rest}
      error={error}
      maxLength={maxLength}
      onChange={handleTextChange}
      ref={ref}
      value={value}
    />
  )
})
