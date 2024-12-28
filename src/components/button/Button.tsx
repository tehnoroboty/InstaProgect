import { ComponentPropsWithoutRef } from 'react'

export type Props = {
  variant?: 'primary' | 'secondary' | 'bordered' | 'transparent'
} & ComponentPropsWithoutRef<'button'>

import s from './button.module.scss'

export const Button = ({ className, variant = 'primary', ...rest }: Props) => {
  return <button className={`${s.button} ${s[variant]} `} {...rest} />
}
