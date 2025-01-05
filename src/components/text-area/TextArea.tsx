'use client'

import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import s from './textArea.module.scss'

export type Props = {
  disabled?: boolean
  errorMessage?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = ({ disabled = false, errorMessage, ...rest }: Props) => {
  const [text, setText] = useState('')
  const [isActive, setIsActive] = useState(false)

  const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
  }

  const textAreaBlurHandler = () => {
    if (text.trim()) {
      setIsActive(true)

      return
    }
    setIsActive(false)
  }

  const textAreaFocusHandler = () => {
    setIsActive(false)
  }

  const textareaClass = `${s.textArea} ${text.trim() !== '' && isActive ? s.isActive : ''} ${errorMessage ? s.isError : ''}`

  return (
    <div className={`${s.container}`}>
      <label className={s.label}>
        Text-area
        <textarea
          className={textareaClass}
          disabled={disabled}
          onBlur={textAreaBlurHandler}
          onChange={textAreaChangeHandler}
          onFocus={textAreaFocusHandler}
          placeholder={'Text-area'}
          value={text}
        />
      </label>
      {errorMessage && <span className={s.errorText}>{errorMessage}</span>}
    </div>
  )
}
