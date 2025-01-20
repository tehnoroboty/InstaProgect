// @flow
import * as React from 'react'

import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUpOutline,
} from '@/src/assets/componentsIcons'
import { MenuItemType } from '@/src/components/navigationPanel/NavigationPanel'
import { Typography } from '@/src/components/typography/Typography'

import s from './headerMobile.module.scss'

import { SelectLanguage } from '../../select/SelectLanguage/SelectLanguage'
import { DropdownMenuMobile } from './dropdown-menu/DropdownMenu'

type Props = {
  isLoggedIn?: boolean
  notification?: boolean
  title: string
}

export const HeaderMobile = (props: Props) => {
  const { isLoggedIn = true, title } = props

  return (
    <div className={s.container}>
      <Typography as={'h1'} option={'Large'}>
        {title}
      </Typography>
      <div className={s.headerActions}>
        <SelectLanguage />
        {isLoggedIn && <DropdownMenuMobile items={menuDropdown} />}
      </div>
    </div>
  )
}

const menuDropdown: MenuItemType[] = [
  {
    href: '/statistics',
    icon: TrendingUpOutline,
    title: 'Statistics',
  },
  {
    href: '/favorites',
    icon: BookmarkOutline,
    title: 'Favorites',
  },
  { href: '/settings', icon: SettingsOutline, title: 'Profile Settings' },
  { icon: LogOutOutline, title: 'Log Out' },
]
