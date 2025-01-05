'use client'
import React, { useState } from 'react'
import * as DropdownMenuMob from '@radix-ui/react-dropdown-menu'
import s from './dropdownMenu.module.scss'
import { BookmarkIcon, SettingsIcon, StatisticsIcon, MoreIcon, Logout } from './index'
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
          <MoreIcon
            className={open ? s.iconActive : s.icon}
            height={24}
            wight={24}
            viewBox={`1 3 20 20`}
          />
        </button>
      </DropdownMenuMob.Trigger>

      <DropdownMenuMob.Portal>
        <DropdownMenuMob.Content className={s.content} align={'end'} sideOffset={7}>
          <ItemWrapper href={''} Icon={SettingsIcon} title={'Profile Settings'} />
          <ItemWrapper href={''} Icon={StatisticsIcon} title={'Statistics'} />
          <ItemWrapper href={''} Icon={BookmarkIcon} title={'Favorites'} />
          <ItemWrapper href={''} Icon={Logout} title={'Log Out'} onClick={() => {}} />
        </DropdownMenuMob.Content>
      </DropdownMenuMob.Portal>
    </DropdownMenuMob.Root>
  )
}
