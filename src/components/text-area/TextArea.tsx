import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './textArea.module.scss'

import { Typography } from '../typography/Typography'

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
        <Typography as={'label'} className={s.label} htmlFor={'textarea'} option={'regular_text14'}>
          {label}
        </Typography>
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

      {error && (
        <Typography className={s.errorText} option={'regular_text14'}>
          {error}
        </Typography>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'
