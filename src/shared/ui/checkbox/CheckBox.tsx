import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useId } from 'react'

import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './checkBox.module.scss'

type Props = {
  label?: ReactNode
  labelProps?: ComponentPropsWithoutRef<'label'>
} & ComponentPropsWithoutRef<'input'>

export const CheckBox = forwardRef<ElementRef<'input'>, Props>(
  ({ className, disabled = false, label, labelProps, ...rest }, ref) => {
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
          <Typography as={'label'} className={clsx(s.label, labelProps?.className)} htmlFor={id}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)
