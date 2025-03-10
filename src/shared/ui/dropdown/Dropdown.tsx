'use client'
import { type ElementType, KeyboardEvent, type ReactNode, useState } from 'react'

import { MoreHorizontalOutline } from '@/src/shared/assets/componentsIcons'
import { DropdownItem } from '@/src/shared/ui/dropdown/dropdownItem/dropdownItem'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

import { DropdownItem } from './dropdownItem/DropdownItem'

export type DropdownMenuItems = {
  href?: string
  icon: ElementType
  id: string
  onClick?: () => void
  title: string
}

type Props<T extends DropdownMenuItems> = {
  list: T[]
  renderItem?: (item: T, index?: number) => ReactNode
  trigger?: ReactNode
}

export const Dropdown = <T extends DropdownMenuItems>(props: Props<T>) => {
  const { list, renderItem, trigger } = props
  const [open, setOpen] = useState(false)

  const handleOpenChange = () => {
    setOpen(!open)
  }

  const triggerClassName = clsx(s.trigger, { [s.iconActive]: open })
  const contentClassName = clsx(s.content)

  const dropDownMenuItems = list.map((item: T) => {
    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.code === 'Enter') {
        if ('onClick' in item && typeof item.onClick === 'function') {
          item.onClick()
          setOpen(false)
        } else if ('href' in item && typeof item.href === 'string') {
          window.location.href = item.href
        }
      }
    }

    return (
      <DropdownMenu.Item className={s.dropdownItem} key={item.id} onKeyDown={onKeyDownHandler}>
        {renderItem ? (
          renderItem(item)
        ) : (
          <DropdownItem Icon={item.icon} onClick={item.onClick} title={item.title} />
        )}
      </DropdownMenu.Item>
    )
  })

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild className={triggerClassName}>
        {trigger ?? (
          <button type={'button'}>
            <MoreHorizontalOutline height={24} viewBox={`1 3 20 20`} />
          </button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={contentClassName}>
          {dropDownMenuItems}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
