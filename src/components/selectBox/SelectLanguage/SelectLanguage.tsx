'use client'

import { ComponentPropsWithoutRef, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import styles from '../SelectBox.module.scss'
import { SelectItem } from '../SelectItem'
import { SelectIcon } from '../SelectIcon'
import { SelectIconUk } from './SelectIconUk'
import { SelectIconRu } from './SelectIconRu'

type Values = {
  value: string
  valueTitle: string
}

type Props = ComponentPropsWithoutRef<'button'>

export const SelectLanguage = ({ ...rest }: Props) => {
  const values: Values[] = [
    { value: 'united-kingdom', valueTitle: 'English' },
    { value: 'russia', valueTitle: 'Russian' },
  ]

  const [value, setValue] = useState(values[0].value)

  const getIconByValue = (value: string) => {
    switch (value) {
      case 'united-kingdom':
        return <SelectIconUk className={styles.IconLanguage} />
      case 'russia':
        return <SelectIconRu className={styles.IconLanguage} />
      default:
        return null
    }
  }

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger className={`${styles.Trigger} ${styles.TriggerLanguage}`} {...rest}>
        <Select.Value aria-label={value}>
          <div className={styles.ValueTitleLang}>
            {getIconByValue(value)}
            <div className={styles.TitleLang}>
              {values.find(item => item.value === value)?.valueTitle}
            </div>
          </div>
        </Select.Value>

        <Select.Icon asChild>
          <SelectIcon className={styles.Icon} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={styles.Content}
          position={'popper'}
          avoidCollisions={true}
          sideOffset={-1}
        >
          <Select.Viewport>
            <Select.Group>
              {values.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  <div className={styles.ItemContent}>
                    {getIconByValue(item.value)}
                    <div className={styles.ItemTitle}>{item.valueTitle}</div>
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
