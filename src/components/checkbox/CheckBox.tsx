import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/src/components/typography/Typography'
import { v1 } from 'uuid'

import s from './checkBox.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const CheckBox = forwardRef<ElementRef<'input'>, Props>(
  ({ className, disabled = false, label, ...rest }, ref) => {
    const id = v1()

    return (
      <div className={`${s.container} ${className}`}>
        <input
          className={s.checkbox}
          disabled={disabled}
          id={id}
          ref={ref}
          type={'checkbox'}
          {...rest}
        />
        {label && (
          <Typography as={'label'} className={s.label} htmlFor={id}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)
