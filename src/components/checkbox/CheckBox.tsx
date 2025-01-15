import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'

import s from './checkBox.module.scss'

type Props = {
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const CheckBox = forwardRef<ElementRef<'input'>, Props>(
  ({ className, disabled = false, label, ...rest }, ref) => {
    const id = useId()

    return (
      <div className={clsx(s.container, className)}>
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
