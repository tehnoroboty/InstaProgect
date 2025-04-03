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
   * If true, displays the select in compact pagination style
   */
  isPagination?: boolean
  /**
   * The text of the label for the select. If omitted, the label is not
   * displayed.
   */
  label?: string
  onChangeValue?: (value: string) => void
  /**
   * An array of options to choose from. Each option must contain a 'value'
   * and a 'value Title' (displayed text).
   */
  options: Options[]
  /**
   * The text that is displayed if nothing is selected.
   */
  placeholder?: string
} & ComponentPropsWithoutRef<'button'>

/** Ui kit SelectBox component */
export const SelectBox = ({
  className,
  isPagination = false,
  label,
  onChangeValue,
  options = [],
  placeholder = options.length > 0 ? options[0].value : 'Select',
  ...rest
}: Props) => {
  const renderOptions = (options: Options[]) =>
    options.map(item => (
      <SelectItem isPagination={isPagination} key={item.value} value={item.valueTitle}>
        {item.valueTitle}
      </SelectItem>
    ))

  return (
    <div className={clsx(styles.container, className)}>
      <Select.Root onValueChange={value => onChangeValue?.(value)}>
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
