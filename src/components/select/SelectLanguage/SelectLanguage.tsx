'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

import Arrow from '@/src/assets/componentsIcons/ArrowIosDownOutline'
import FlagRu from '@/src/assets/componentsIcons/Flagrussia'
import FlagUK from '@/src/assets/componentsIcons/Flagunitedkingdom'
import { Options } from '@/src/components/select/SelectBox'
import { SelectItem } from '@/src/components/select/SelectItem'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import styles from '@/src/components/select/Select.module.scss'

type Props = ComponentPropsWithoutRef<'button'>
/** Ui kit SelectLanguage component */
export const SelectLanguage = ({ ...rest }: Props) => {
  const options: Options[] = [
    { value: 'united-kingdom', valueTitle: 'English' },
    { value: 'russia', valueTitle: 'Russian' },
  ]

  const [value, setValue] = useState(options[0].value)

  const getIconByValue = (value: string) => {
    switch (value) {
      case 'united-kingdom':
        return <FlagUK className={styles.iconFlag} />
      case 'russia':
        return <FlagRu className={styles.iconFlag} />
      default:
        return null
    }
  }

  return (
    <Select.Root onValueChange={setValue} value={value}>
      <Select.Trigger className={clsx(styles.trigger, styles.triggerLanguage)} {...rest}>
        <Select.Value aria-label={value}>
          <div className={styles.valueTitleLang}>
            {getIconByValue(value)}
            <div className={styles.titleLang}>
              {options.find(item => item.value === value)?.valueTitle}
            </div>
          </div>
        </Select.Value>

        <Select.Icon asChild>
          <Arrow className={clsx(styles.icon, styles.iconSmall)} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          avoidCollisions
          className={styles.content}
          position={'popper'}
          sideOffset={-1}
        >
          <Select.Viewport>
            <Select.Group>
              {options.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  <div className={styles.itemLanguageContent}>
                    {getIconByValue(item.value)}
                    <div className={styles.itemTitle}>{item.valueTitle}</div>
                  </div>
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
