'use client'
import React, { ChangeEvent, ComponentProps, forwardRef, useState } from 'react'

import { TextArea } from '@/src/shared/ui/textArea/TextArea'

type Props = {
  maxLength: number
  onErrorChange?: (error: string | undefined) => void
  onTextChange?: (text: string) => void
} & Omit<ComponentProps<typeof TextArea>, 'onChange' | 'value'>

export const TextAreaWithValidation = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { maxLength, onErrorChange, onTextChange, ...rest } = props

  const [error, setError] = useState<string | undefined>(undefined)
  const [textValue, setTextValue] = useState('')

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value

    setTextValue(newValue)

    onTextChange?.(newValue)

    const newError =
      newValue.length > maxLength
        ? `The maximum length should be no more than ${maxLength} characters`
        : undefined

    setError(newError)

    onErrorChange?.(newError)
  }

  return (
    <TextArea
      {...rest}
      error={error}
      maxLength={maxLength}
      onChange={handleTextChange}
      ref={ref}
      value={textValue}
    />
  )
})
