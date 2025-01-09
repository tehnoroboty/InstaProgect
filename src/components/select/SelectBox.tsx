import { ComponentPropsWithoutRef } from 'react'

import * as Select from '@radix-ui/react-select'

import styles from './Select.module.scss'

import { SelectItem } from './SelectItem'
import Arrow from '@/src/assets/componentsIcons/ArrowIosDownOutline'

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
        {label && <Select.Label className={styles.label}>{label}</Select.Label>}
        <Select.Trigger
          className={`${styles.trigger} ${label && styles.triggerLabel}`}
          {...rest}
          aria-label={placeholder}
          style={{ width }}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon asChild>
            <Arrow className={styles.icon} />
          </Select.Icon>
        </Select.Trigger>
      </Select.Group>

      <Select.Portal>
        <Select.Content
          avoidCollisions
          className={styles.content}
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
