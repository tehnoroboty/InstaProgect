import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode | string
  className?: string
  variant?: 'bordered' | 'primary' | 'secondary' | 'transparent'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const { as: Component = 'button', className, variant = 'primary', ...rest } = props

  return <Component className={`${s.button} ${s[variant]} ${className}`} {...rest} />
}
