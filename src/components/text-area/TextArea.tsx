import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './textArea.module.scss'

export type TextAreaProps = {
  error?: string
  label?: string
  onClear?: () => void
  placeholder?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<ElementRef<'textarea'>, TextAreaProps>((props, ref) => {
  const {
    className,
    disabled = false,
    error,
    id,
    label = 'Text-area',
    onClear,
    placeholder = 'Text-area',
    value,
    ...rest
  } = props

  const textareaClass = `${s.textArea} ${error ? s.isError : ''}`

  return (
    <div className={`${s.container} ${className}`}>
      {label && (
        <label className={s.label} htmlFor={'textarea'}>
          {label}
        </label>
      )}
      <textarea
        {...rest}
        className={textareaClass}
        disabled={disabled}
        name={'textarea'}
        placeholder={placeholder}
        ref={ref}
        value={value}
      />

      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
})

TextArea.displayName = 'TextArea'
