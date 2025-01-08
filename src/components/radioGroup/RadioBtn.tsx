import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './radioBtn.module.scss'

type Props = {
  label: string
} & ComponentPropsWithoutRef<'input'>

export const RadioBtn = forwardRef<ElementRef<'input'>, Props>(
  ({ className, label, ...rest }, ref) => {
    return (
      <div className={s.container}>
        <input className={s.radiobtn} id={'radioId'} ref={ref} type={'radio'} {...rest} />
        <label className={s.label} htmlFor={'radioId'}>
          {label}
        </label>
      </div>
    )
  }
)
