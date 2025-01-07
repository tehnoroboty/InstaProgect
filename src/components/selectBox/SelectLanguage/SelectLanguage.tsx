'use client'

import { ComponentPropsWithoutRef, useState } from 'react'

import * as Select from '@radix-ui/react-select'

import styles from '../SelectBox.module.scss'

import { SelectIcon } from '../SelectIcon'
import { SelectItem } from '../SelectItem'
import { SelectIconRu } from './SelectIconRu'
import { SelectIconUk } from './SelectIconUk'

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
        return <SelectIconUk className={styles.iconLanguage} />
      case 'russia':
        return <SelectIconRu className={styles.iconLanguage} />
      default:
        return null
    }
  }

  return (
    <Select.Root onValueChange={setValue} value={value}>
      <Select.Trigger className={`${styles.trigger} ${styles.triggerLanguage}`} {...rest}>
        <Select.Value aria-label={value}>
          <div className={styles.valueTitleLang}>
            {getIconByValue(value)}
            <div className={styles.titleLang}>
              {values.find(item => item.value === value)?.valueTitle}
            </div>
          </div>
        </Select.Value>

        <Select.Icon asChild>
          <SelectIcon className={styles.icon} />
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
              {values.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  <div className={styles.itemContent}>
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
