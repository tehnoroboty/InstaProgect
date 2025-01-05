import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import s from './Input.module.scss'

export type TextFieldProps = {
  error?: string
  onClear?: () => void
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<ElementRef<'input'>, TextFieldProps>((props, ref) => {
  const { className, type, ...rest } = props
  return <input type={type} className={`${s.input} ${className}`} ref={ref} {...rest} />
})
Input.displayName = 'Input'

export { Input }
