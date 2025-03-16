'use client'
import React, { ChangeEvent, ComponentProps, forwardRef, useEffect } from 'react'

import { TextArea } from '@/src/shared/ui/textArea/TextArea'

type Props = {
  error: string | undefined
  maxLength: number
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  setError: (error: string | undefined) => void
  value: string
} & ComponentProps<typeof TextArea>

export const TextAreaWithValidation = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { error, maxLength, onChange, setError, value, ...rest } = props

  useEffect(() => {
    const newError =
      value.length > maxLength
        ? `The maximum length should be no more than ${maxLength} characters`
        : undefined

    setError(newError)
  }, [value, setError, maxLength])

  return (
    <TextArea
      {...rest}
      error={error}
      maxLength={maxLength}
      onChange={onChange}
      ref={ref}
      value={value}
    />
  )
})
