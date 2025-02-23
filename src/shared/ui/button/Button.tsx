import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode | string
  className?: string
  fullWidth?: boolean
  variant?: 'bordered' | 'primary' | 'secondary' | 'transparent'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const {
    as: Component = 'button',
    className,
    fullWidth = false,
    variant = 'primary',
    ...rest
  } = props

  const classNames = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

  return <Component className={classNames} {...rest} />
}
