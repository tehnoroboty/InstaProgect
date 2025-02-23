import { ComponentPropsWithoutRef } from 'react'

import Arrow from '@/src/shared/assets/componentsIcons/ArrowIosDownOutline'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import styles from './Select.module.scss'

import { SelectItem } from './SelectItem'

export type Options = {
  value: string
  valueTitle: string
}

type Props = {
  /**
   * The text of the label for the select. If omitted, the label is not displayed.
   */
  label?: string
  /**
   * An array of options to choose from. Each option must contain a 'value' and a 'value Title' (displayed text).
   */
  options: Options[]
  /**
   * The text that is displayed if nothing is selected.
   */
  placeholder?: string
  /**
   * The size of the select. It can be 'large = 358px', 'medium = 330px' or 'small = 234px'. Affects the width of the select.
   */
  size?: 'large' | 'medium' | 'small'
} & ComponentPropsWithoutRef<'button'>

/** Ui kit SelectBox component */
export const SelectBox = ({
  className,
  label,
  options,
  placeholder = options.length > 0 ? options[0].value : 'Select',
  size,
  ...rest
}: Props) => {
  const isPagination = options.every(option => !isNaN(Number(option.value)))

  const renderOptions = (options: Options[]) =>
    options.map(item => (
      <SelectItem isPagination={isPagination} key={item.value} value={item.value}>
        {item.valueTitle}
      </SelectItem>
    ))

  return (
    <div className={clsx(size && styles[size], className)}>
      <Select.Root>
        <Select.Group>
          {label && <Select.Label className={styles.label}>{label}</Select.Label>}
          <Select.Trigger
            className={clsx(
              styles.trigger,
              label && styles.triggerLabel,
              isPagination && styles.numbers
            )}
            {...rest}
            aria-label={placeholder}
          >
            <Select.Value placeholder={placeholder} />
            <Select.Icon asChild>
              <Arrow className={clsx(styles.icon, isPagination && styles.iconSmall)} />
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
              <Select.Group>{renderOptions(options)}</Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
