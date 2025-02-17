'use client'
import React, { useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

type Props<T> = {
  isOpen?: boolean
  list: T[]
  renderItem: (item: T, index?: number) => React.ReactNode
  trigger: React.ReactNode
}

export const Dropdown = <T,>(props: Props<T>) => {
  const { isOpen = false, list, renderItem, trigger } = props
  const [open, setOpen] = useState(isOpen)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const triggerClassName = clsx(s.trigger, { [s.iconActive]: open })
  const contentClassName = clsx(s.content)

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild className={triggerClassName}>
        {trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={contentClassName} sideOffset={7}>
          {list.map((item, index) => (
            <DropdownMenu.Item key={index}>{renderItem(item)}</DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
