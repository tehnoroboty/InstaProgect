import { ComponentPropsWithoutRef } from 'react'
import s from './checkBox.module.scss'

export type Props = ComponentPropsWithoutRef<'input'> & {
  label?: string
}

export const CheckBox = ({ className, label, ...rest }: Props) => {
  return (
    <div className={`${s.container}`}>
      <input type="checkbox" className={`${s.checkbox}`} {...rest} />
      {label ? <span className={`${s.label}`}>{label}</span> : null}
    </div>
  )
}
