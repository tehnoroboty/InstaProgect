import { ComponentPropsWithoutRef } from 'react'

import * as Select from '@radix-ui/react-select'

import styles from './SelectBox.module.scss'

import { SelectIcon } from './SelectIcon'
import { SelectItem } from './SelectItem'

type Values = {
  value: string
  valueTitle: string
}

type Props = {
  label?: string
  placeholder: string
  width?: number | string
} & ComponentPropsWithoutRef<'button'>

export const SelectBox = ({ label, placeholder = 'Select', width = '100%', ...rest }: Props) => {
  const values: Values[] = [
    { value: 'value1', valueTitle: 'Value-1' },
    { value: 'value2', valueTitle: 'Value-2' },
    { value: 'value3', valueTitle: 'Value-3' },
    { value: 'value4', valueTitle: 'Value-4' },
    { value: 'value5', valueTitle: 'Value-5' },
  ]

  return (
    <Select.Root>
      <Select.Group>
        {label && <Select.Label className={styles.Label}>{label}</Select.Label>}
        <Select.Trigger
          className={`${styles.Trigger} ${label && styles.TriggerLabel}`}
          {...rest}
          aria-label={placeholder}
          style={{ width }}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon asChild>
            <SelectIcon className={styles.Icon} />
          </Select.Icon>
        </Select.Trigger>
      </Select.Group>

      <Select.Portal>
        <Select.Content
          avoidCollisions
          className={styles.Content}
          position={'popper'}
          sideOffset={-1}
        >
          <Select.Viewport>
            <Select.Group>
              {values.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.valueTitle}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
