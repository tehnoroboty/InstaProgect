import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './checkBox.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const CheckBox = forwardRef<ElementRef<'input'>, Props>(
  ({ className, label, ...rest }, ref) => {
    return (
      <div className={`${s.container} ${className}`}>
        <input className={s.checkbox} id={'checkboxId'} ref={ref} type={'checkbox'} {...rest} />
        {label && (
          <label className={s.label} htmlFor={'checkboxId'}>
            {label}
          </label>
        )}
      </div>
    )
  }
)
