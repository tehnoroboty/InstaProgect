'use client'
import React, { ChangeEvent, ComponentProps, forwardRef, useEffect, useState } from 'react'

import { TextArea } from '@/src/shared/ui/textArea/TextArea'

type Props = {
  maxLength: number
  onErrorChange?: (error: string | undefined) => void
  onTextChange?: (text: string) => void
  value?: string
} & Omit<ComponentProps<typeof TextArea>, 'onChange'>

export const TextAreaWithValidation = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { maxLength, onErrorChange, onTextChange, value = '', ...rest } = props

  const [error, setError] = useState<string | undefined>(undefined)
  const [textValue, setTextValue] = useState('')

  // Синхронизируем value и textValue
  useEffect(() => {
    setTextValue(value)
  }, [value])

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
