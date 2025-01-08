import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './textArea.module.scss'

export type Props = {
  error?: string
  onClear?: () => void
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<ElementRef<'textarea'>, Props>((props, ref) => {
  const { className, disabled = false, error, id, onClear, value, ...rest } = props

  const textareaClass = `${s.textArea} ${error ? s.isError : ''}`

  return (
    <div className={`${s.container} ${className}`}>
      <label className={s.label}>
        Text-area
        <textarea
          {...rest}
          className={textareaClass}
          disabled={disabled}
          placeholder={'Text-area'}
          ref={ref}
          value={value}
        />
      </label>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
})

TextArea.displayName = 'TextArea'
