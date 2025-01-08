'use client'

import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import s from './textArea.module.scss'

export type Props = {
  disabled?: boolean
  errorMessage?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<ElementRef<'textarea'>, Props>(
  ({ className, disabled = false, errorMessage, ...rest }, ref) => {
    const [text, setText] = useState('')

    const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value)
    }

    const textareaClass = `${s.textArea} ${errorMessage ? s.isError : ''}`

    return (
      <div className={`${s.container} ${className}`}>
        <label className={s.label}>
          Text-area
          <textarea
            {...rest}
            className={textareaClass}
            disabled={disabled}
            onChange={textAreaChangeHandler}
            placeholder={'Text-area'}
            ref={ref}
            value={text}
          />
        </label>
        {errorMessage && <span className={s.errorText}>{errorMessage}</span>}
      </div>
    )
  }
)
