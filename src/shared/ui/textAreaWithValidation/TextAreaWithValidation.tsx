'use client'
import React, { ChangeEvent, ComponentProps, forwardRef, useState } from 'react'

import { TextArea } from '@/src/shared/ui/textArea/TextArea'

type Props = {
  /** Начальное значение текста. */
  initialValue?: string
  /** Максимальная длина текста. */
  maxLength: number
  /** Функция обратного вызова, которая вызывается при изменении текста. */
  onChange?: (value: string) => void
  /** Функция обратного вызова, которая вызывается при изменении состояния ошибки. */
  onErrorChange?: (error: string | undefined) => void
} & Omit<ComponentProps<typeof TextArea>, 'onChange' | 'value'>

export const TextAreaWithValidation = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { initialValue = '', maxLength, onChange, onErrorChange, ...rest } = props
  const [textValue, setTextValue] = useState(initialValue)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value

    setTextValue(newValue)

    const newError =
      newValue.length > maxLength
        ? `The maximum length should be no more than ${maxLength} characters`
        : undefined

    setError(newError) // Обновляем состояние ошибки

    // Вызываем колбэк, если он передан
    if (onErrorChange) {
      onErrorChange(newError)
    }

    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <TextArea
      {...rest}
      error={error}
      maxLength={maxLength}
      onChange={handleChange}
      ref={ref}
      value={textValue}
    />
  )
})
