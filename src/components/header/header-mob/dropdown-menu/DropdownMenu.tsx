'use client'
import React, { useState } from 'react'
import * as DropdownMenuMob from '@radix-ui/react-dropdown-menu'
import s from './dropdownMenu.module.scss'
import {
  LogOutOutline,
  MoreHorizontalOutline,
  SettingsOutline,
  BookmarkOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons/index'
import { ItemWrapper } from '@/src/components/itemWrapper/ItemWrapper'

export const DropdownMenuMobile = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DropdownMenuMob.Root onOpenChange={handleOpenChange}>
      <DropdownMenuMob.Trigger asChild>
        <button className={s.iconButton} aria-label="Customise options">
          <MoreHorizontalOutline
            className={open ? s.iconActive : s.icon}
            height={24}
            viewBox={`1 3 20 20`}
          />
        </button>
      </DropdownMenuMob.Trigger>

      <DropdownMenuMob.Portal>
        <DropdownMenuMob.Content className={s.content} align={'end'} sideOffset={7}>
          <ItemWrapper href={''} Icon={SettingsOutline} title={'Profile Settings'} />
          <ItemWrapper href={''} Icon={TrendingUpOutline} title={'Statistics'} />
          <ItemWrapper href={''} Icon={BookmarkOutline} title={'Favorites'} />
          <ItemWrapper href={''} Icon={LogOutOutline} title={'Log Out'} onClick={() => {}} />
        </DropdownMenuMob.Content>
      </DropdownMenuMob.Portal>
    </DropdownMenuMob.Root>
  )
}
