import { ComponentPropsWithoutRef } from 'react'

import s from './checkBox.module.scss'

export type Props = {
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const CheckBox = ({ className, label, ...rest }: Props) => {
  return (
    <div className={`${s.container}`}>
      <input className={`${s.checkbox}`} type={'checkbox'} {...rest} />
      {label ? <span className={`${s.label}`}>{label}</span> : null}
    </div>
  )
}
