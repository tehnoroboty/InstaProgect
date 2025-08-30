'use client'

import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useId,
  useState,
} from 'react'

import { ImageOutline } from '@/src/shared/assets/componentsIcons'
import Close from '@/src/shared/assets/componentsIcons/CloseOutline'
import EyeOff from '@/src/shared/assets/componentsIcons/EyeOffOutline'
import Eye from '@/src/shared/assets/componentsIcons/EyeOutline'
import Search from '@/src/shared/assets/componentsIcons/SearchOutline'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './Input.module.scss'

export type InputProps = {
  error?: string
  important?: boolean
  label?: string
  onClear?: () => void
  onImageUpload?: (file: File) => void
  placeholder?: string
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<ElementRef<'input'>, InputProps>((props, ref) => {
  const {
    className,
    disabled = false,
    error,
    id,
    important = false,
    label,
    onClear,
    onImageUpload,
    placeholder = 'Input text',
    type,
    value,
    ...rest
  } = props

  const generatedId = useId()
  const finalId = id ?? generatedId

  const InputType = {
    messageType: 'message',
    passwordType: 'password',
    searchType: 'search',
  } as const

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const inputType = type === InputType.passwordType && isPasswordVisible ? 'text' : type

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file && onImageUpload) {
      onImageUpload(file)
    }
  }

  return (
    <div className={clsx(s.container, className)}>
      {label && (
        <Typography
          as={'label'}
          className={clsx(s.label, { [s.disabled]: disabled })}
          disabled={disabled}
          htmlFor={finalId}
        >
          {label}
          {important && <span className={s.importantForLabel}>{'*'}</span>}
        </Typography>
      )}
      <div className={clsx(s.group, { [s.disabled]: disabled })}>
        <input
          className={clsx(
            s.input,
            { [s.placeholder]: placeholder },
            { [s.error]: error },
            { [s.searchPadding]: type === InputType.searchType },
            { [s.passwordPadding]: type === InputType.passwordType },
            { [s.messagePadding]: type === InputType.messageType }
          )}
          disabled={disabled}
          id={finalId}
          placeholder={placeholder}
          ref={ref}
          type={inputType}
          value={value}
          {...rest}
        />

        {type === InputType.searchType && value && (
          <Close className={clsx(s.clear, { [s.disabledIcon]: disabled })} onClick={onClear} />
        )}

        {type === InputType.searchType && (
          <Search className={clsx(s.searchIcon, { [s.disabledIcon]: disabled })} />
        )}

        {type === InputType.passwordType && isPasswordVisible && (
          <Eye
            className={clsx(s.eyeIcon, { [s.disabledIcon]: disabled })}
            onClick={togglePasswordVisibility}
          />
        )}

        {type === InputType.passwordType && !isPasswordVisible && (
          <EyeOff
            className={clsx(s.eyeIcon, { [s.disabledIcon]: disabled })}
            onClick={togglePasswordVisibility}
          />
        )}

        {type === InputType.messageType && (
          <label className={clsx(s.imageUploadLabel, { [s.disabledIcon]: disabled })}>
            <ImageOutline className={s.imageIcon} />
            <input
              accept={'image/*'}
              className={s.hiddenFileInput}
              onChange={handleImageUpload}
              type={'file'}
            />
          </label>
        )}
      </div>
      {error && !disabled && <Typography className={s.errorMessage}>{error}</Typography>}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
