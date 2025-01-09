import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId, useState } from 'react'

import Close from '@/src/assets/componentsIcons/CloseOutline'
import EyeOff from '@/src/assets/componentsIcons/EyeOffOutline'
import Eye from '@/src/assets/componentsIcons/EyeOutline'
import Search from '@/src/assets/componentsIcons/SearchOutline'

import s from './Input.module.scss'

export type InputProps = {
  error?: string
  onClear?: () => void
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<ElementRef<'input'>, InputProps>((props, ref) => {
  const { className, disabled = false, error, id, onClear, type, value, ...rest } = props

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
    <div className={s.container}>
      <div className={`${s.group} ${disabled ? s.disabled : ''}`}>
        <input
          className={`${s.input} ${className} ${error ? s.error : ''} ${type === InputType.searchType ? s.searchPadding : ''} ${
            type === InputType.passwordType ? s.passwordPadding : ''
          } ${className || ''}`}
          disabled={disabled}
          id={finalId}
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
      {error && <p className={s.errorMessage}>{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
