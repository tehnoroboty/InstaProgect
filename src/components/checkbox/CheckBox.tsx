import { ComponentPropsWithoutRef } from 'react'

import s from './checkBox.module.scss'

export type Props = {
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const CheckBox = ({ className, label, ...rest }: Props) => {
  return (
    <div className={`${s.container}`}>
      <input className={`${s.checkbox}`} id={'checkboxId'} type={'checkbox'} {...rest} />
      {label ? (
        <label  className={`${s.label}`} htmlFor={'checkboxId'}>
          {label}
        </label>
      ) : null}
    </div>
  )
}
