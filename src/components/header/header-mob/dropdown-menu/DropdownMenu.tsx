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
import * as DropdownMenuMob from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdownMenu.module.scss'

export const DropdownMenuMobile = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DropdownMenuMob.Root onOpenChange={handleOpenChange}>
      <DropdownMenuMob.Trigger asChild>
        <button aria-label={'Customise options'} className={s.iconButton}>
          <MoreHorizontalOutline
            className={clsx(s.icon, { [s.iconActive]: open })}
            height={24}
            viewBox={`1 3 20 20`}
          />
        </button>
      </DropdownMenuMob.Trigger>

      <DropdownMenuMob.Portal>
        <DropdownMenuMob.Content align={'end'} className={s.content} sideOffset={7}>
          <ItemWrapper Icon={SettingsOutline} href={''} title={'Profile Settings'} />
          <ItemWrapper Icon={TrendingUpOutline} href={''} title={'Statistics'} />
          <ItemWrapper Icon={BookmarkOutline} href={''} title={'Favorites'} />
          <ItemWrapper Icon={LogOutOutline} href={''} onClick={() => {}} title={'Log Out'} />
        </DropdownMenuMob.Content>
      </DropdownMenuMob.Portal>
    </DropdownMenuMob.Root>
  )
}
