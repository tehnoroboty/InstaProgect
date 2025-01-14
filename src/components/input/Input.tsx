import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId, useState } from 'react'

import Close from '@/src/assets/componentsIcons/CloseOutline'
import EyeOff from '@/src/assets/componentsIcons/EyeOffOutline'
import Eye from '@/src/assets/componentsIcons/EyeOutline'
import Search from '@/src/assets/componentsIcons/SearchOutline'
import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'

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
    <div className={clsx(s.container, className)}>
      {label && (
        <Typography
          as={'label'}
          className={clsx(s.label, { [s.disabled]: disabled })}
          disabled={disabled}
          htmlFor={finalId}
        >
          {label}
        </Typography>
      )}
      <div className={clsx(s.group, { [s.disabled]: disabled })}>
        <input
          className={clsx(
            s.input,
            { [s.placeholder]: placeholder },
            { [s.error]: error },
            { [s.searchPadding]: type === InputType.searchType },
            { [s.passwordPadding]: type === InputType.passwordType }
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
      </div>
      {error && !disabled && <Typography className={s.errorMessage}>{error}</Typography>}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
