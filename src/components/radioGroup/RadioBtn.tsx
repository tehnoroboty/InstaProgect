import { ComponentPropsWithoutRef } from 'react'

import s from './radioBtn.module.scss'

export type Props = {
  label: string
} & ComponentPropsWithoutRef<'input'>

export const RadioBtn = ({ className, label, ...rest }: Props) => {
  return (
    <div className={`${s.container}`}>
      <input className={`${s.radiobtn}`} type={'radio'} {...rest} />
      <span className={`${s.label}`}>{label}</span>
    </div>
  )
}
