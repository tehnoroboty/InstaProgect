import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Typography } from '@/src/components/typography/Typography'

import s from './radioBtn.module.scss'

type Props = {
  label: string
  name: string
} & ComponentPropsWithoutRef<'input'>

export const RadioBtn = forwardRef<ElementRef<'input'>, Props>(
  ({ className, disabled = false, label, name, ...rest }, ref) => {
    const id = useId()

    return (
      <div className={`${s.container} ${className}`}>
        <input
          className={s.radiobtn}
          disabled={disabled}
          id={id}
          name={name}
          ref={ref}
          type={'radio'}
          {...rest}
        />
        <Typography as={'label'} className={s.label} htmlFor={id} option={'bold_text14'}>
          {label}
        </Typography>
      </div>
    )
  }
)
