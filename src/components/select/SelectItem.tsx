import React, { ComponentPropsWithRef, ForwardedRef } from 'react'

import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import styles from './Select.module.scss'

type SelectItemProps = {
  className?: string
} & ComponentPropsWithRef<typeof Select.Item>

export const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item className={clsx(styles.item, className)} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)
