import { ComponentPropsWithoutRef } from 'react'

import s from './button.module.scss'

export type Props = {
  variant?: 'bordered' | 'primary' | 'secondary' | 'transparent'
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ className, title, variant = 'primary', ...rest }: Props) => {
  return <button className={`${s.button} ${s[variant]} `} type={'button'} {...rest} />
}
