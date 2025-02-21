'use client'
import React, { KeyboardEvent, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

type Props<T> = {
  list: T[]
  renderItem: (item: T, index?: number) => React.ReactNode
  trigger: React.ReactNode
}

export const Dropdown = <T,>(props: Props<T>) => {
  const { list, renderItem, trigger } = props
  const [open, setOpen] = useState(false)

  const handleOpenChange = () => {
    setOpen(!open)
  }

  const triggerClassName = clsx(s.trigger, { [s.iconActive]: open })
  const contentClassName = clsx(s.content)

  const dropDownMenuItems = list.map((item: T, index) => {
    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
      if (item instanceof Object && 'onClick' in item && typeof item.onClick === 'function') {
        if (e.code === 'Enter') {
          item.onClick()
        }
      }
    }

    return (
      <DropdownMenu.Item className={s.dropdownItem} key={index} onKeyDown={onKeyDownHandler}>
        {renderItem(item)}
      </DropdownMenu.Item>
    )
  })

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={contentClassName} sideOffset={7}>
          {dropDownMenuItems}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
