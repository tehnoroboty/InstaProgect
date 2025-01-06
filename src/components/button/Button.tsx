import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

export type Props<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode | string
  variant?: 'bordered' | 'primary' | 'secondary' | 'transparent'
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const { variant = 'primary', className, as: Component = 'button', ...rest } = props
  return <Component className={`${s.button} ${s[variant]} `} {...rest} />
}
