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

import s from './dropdownMenu.module.scss'

export const DropdownMenuMobile = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DropdownMenuMob.Root onOpenChange={handleOpenChange}>
      <DropdownMenuMob.Trigger asChild>
        <button aria-label={'Customise options'} className={s.iconButton} type={'button'}>
          <MoreHorizontalOutline
            className={open ? s.iconActive : s.icon}
            height={24}
            viewBox={`1 3 20 20`}
          />
        </button>
      </DropdownMenuMob.Trigger>

      <DropdownMenuMob.Portal>
        <DropdownMenuMob.Content align={'end'} className={s.content} sideOffset={7}>
          <DropdownMenuMob.Item>
            <ItemWrapper Icon={SettingsOutline} href={''} title={'Profile Settings'} />
          </DropdownMenuMob.Item>
          <DropdownMenuMob.Item>
            <ItemWrapper Icon={TrendingUpOutline} href={''} title={'Statistics'} />
          </DropdownMenuMob.Item>
          <DropdownMenuMob.Item>
            <ItemWrapper Icon={BookmarkOutline} href={''} title={'Favorites'} />
          </DropdownMenuMob.Item>
          <DropdownMenuMob.Item>
            <ItemWrapper Icon={LogOutOutline} href={''} onClick={() => {}} title={'Log Out'} />
          </DropdownMenuMob.Item>
        </DropdownMenuMob.Content>
      </DropdownMenuMob.Portal>
    </DropdownMenuMob.Root>
  )
}
