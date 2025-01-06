import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId, useState } from 'react'
import s from './Input.module.scss'
import Close from '@/src/assets/componentsIcons/CloseOutline'
import Search from '@/src/assets/componentsIcons/SearchOutline'
import Eye from '@/src/assets/componentsIcons/EyeOutline'
import EyeOff from '@/src/assets/componentsIcons/EyeOffOutline'

export type InputProps = {
  error?: string
  onClear?: () => void
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<ElementRef<'input'>, InputProps>((props, ref) => {
  const { disabled = false, id, value, onClear, className, type, error, ...rest } = props

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
      <div className={`${s.group} ${disabled ? s.disabled : ''}`.trim()}>
        <input
          id={finalId}
          value={value}
          type={inputType}
          disabled={disabled}
          className={`${s.input} ${className} ${error ? s.error : ''} ${type === InputType.searchType ? s.searchPadding : ''} ${
            type === InputType.passwordType ? s.passwordPadding : ''
          } ${className || ''}`.trim()}
          ref={ref}
          {...rest}
        />

        {type === InputType.searchType && value && (
          <Close
            onClick={onClear}
            className={`${s.clear} ${disabled ? s.disabledIcon : ''}`.trim()}
          />
        )}

        {type === InputType.searchType && (
          <Search className={`${s.searchIcon} ${disabled ? s.disabledIcon : ''}`.trim()} />
        )}

        {type === InputType.passwordType && isPasswordVisible && (
          <Eye
            onClick={togglePasswordVisibility}
            className={`${s.eyeIcon} ${disabled ? s.disabledIcon : ''}`.trim()}
          />
        )}

        {type === InputType.passwordType && !isPasswordVisible && (
          <EyeOff
            onClick={togglePasswordVisibility}
            className={`${s.eyeIcon} ${disabled ? s.disabledIcon : ''}`.trim()}
          />
        )}
      </div>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
