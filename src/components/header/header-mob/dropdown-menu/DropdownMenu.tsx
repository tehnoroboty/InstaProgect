'use client'
import React, { useState } from 'react'

import {
  BookmarkOutline,
  LogOutOutline,
  MoreHorizontalOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons/index'
import { ItemWrapper } from '@/src/components/itemWrapper/ItemWrapper'
import { MenuItemType } from '@/src/components/navigationPanel/NavigationPanel'
import * as DropdownMenuMob from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdownMenu.module.scss'

type Props = {
  items: MenuItemType[]
}

export const DropdownMenuMobile = ({ items }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DropdownMenuMob.Root onOpenChange={handleOpenChange}>
      <DropdownMenuMob.Trigger asChild className={s.trigger}>
        <button aria-label={'Customise options'} className={s.iconButton} type={'button'}>
          <MoreHorizontalOutline
            className={clsx(s.icon, { [s.iconActive]: open })}
            height={24}
            viewBox={`1 3 20 20`}
          />
        </button>
      </DropdownMenuMob.Trigger>

      <DropdownMenuMob.Portal>
        <DropdownMenuMob.Content align={'end'} className={s.content} sideOffset={7}>
          {items.map((item: MenuItemType, index) =>
            item.href ? (
              <ItemWrapper Icon={item.icon} href={item.href} key={index} title={item.title} />
            ) : (
              <ItemWrapper Icon={item.icon} key={index} onClick={() => {}} title={item.title} />
            )
          )}
        </DropdownMenuMob.Content>
      </DropdownMenuMob.Portal>
    </DropdownMenuMob.Root>
  )
}
