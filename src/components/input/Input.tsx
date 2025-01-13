import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId, useState } from 'react'

import Close from '@/src/assets/componentsIcons/CloseOutline'
import EyeOff from '@/src/assets/componentsIcons/EyeOffOutline'
import Eye from '@/src/assets/componentsIcons/EyeOutline'
import Search from '@/src/assets/componentsIcons/SearchOutline'
import { Typography } from '@/src/components/typography/Typography'

import s from './Input.module.scss'

export type InputProps = {
  error?: string
  label?: string
  onClear?: () => void
  placeholder?: string
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<ElementRef<'input'>, InputProps>((props, ref) => {
  const {
    className,
    disabled = false,
    error,
    id,
    label,
    onClear,
    placeholder = 'Input text',
    type,
    value,
    ...rest
  } = props

  const generatedId = useId()
  const finalId = id ?? generatedId

  const InputType = {
    passwordType: 'password',
    searchType: 'search',
  } as const

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const inputType = type === InputType.passwordType && isPasswordVisible ? 'text' : type

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className={`${s.container} ${className}`}>
      {label && (
        <Typography
          as={'label'}
          className={`${s.label} ${disabled ? s.disabled : ''}`}
          disabled={disabled}
          htmlFor={finalId}
        >
          {label}
        </Typography>
      )}
      <div className={`${s.group} ${disabled ? s.disabled : ''}`}>
        <input
          className={`${s.input} ${placeholder ? s.placeholder : ''} ${error ? s.error : ''} ${type === InputType.searchType ? s.searchPadding : ''} ${
            type === InputType.passwordType ? s.passwordPadding : ''
          }`}
          disabled={disabled}
          id={finalId}
          placeholder={placeholder}
          ref={ref}
          type={inputType}
          value={value}
          {...rest}
        />

        {type === InputType.searchType && value && (
          <Close className={`${s.clear} ${disabled ? s.disabledIcon : ''}`} onClick={onClear} />
        )}

        {type === InputType.searchType && (
          <Search className={`${s.searchIcon} ${disabled ? s.disabledIcon : ''}`} />
        )}

        {type === InputType.passwordType && isPasswordVisible && (
          <Eye
            className={`${s.eyeIcon} ${disabled ? s.disabledIcon : ''}`}
            onClick={togglePasswordVisibility}
          />
        )}

        {type === InputType.passwordType && !isPasswordVisible && (
          <EyeOff
            className={`${s.eyeIcon} ${disabled ? s.disabledIcon : ''}`}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {error && !disabled && <Typography className={s.errorMessage}>{error}</Typography>}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
