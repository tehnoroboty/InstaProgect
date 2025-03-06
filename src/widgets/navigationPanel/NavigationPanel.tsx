// @flow
'use client'
import * as React from 'react'

import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeLine,
  LogOutOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { MenuMobile } from '@/src/widgets/navigationPanel/menuMobile/MenuMobile'
import Sidebar from '@/src/widgets/navigationPanel/sidebar/Sidebar'

export const NavigationPanel = () => {
  const { data, isLoading, isSuccess } = useMeQuery()

  if (!isSuccess) {
    return null
  }

  return (
    <>
      <MenuMobile items={menuItems.mainActions} />
      <Sidebar items={menuItems} />
    </>
  )
}

export const menuItems: MenuItemsType = {
  additional: [
    { href: '/statistics', icon: TrendingUpOutline, title: 'Statistics' },
    { href: '/favorites', icon: BookmarkOutline, iconActive: Bookmark, title: 'Favorites' },
  ],
  mainActions: [
    { href: '/', icon: HomeLine, iconActive: Home, title: 'Home' },
    { href: '/create', icon: PlusSquareOutline, iconActive: PlusSquare, title: 'Create' },
    {
      href: `/profile/${2084}`,
      icon: PersonOutline,
      iconActive: Person,
      title: 'My Profile',
    },
    {
      href: '/messenger',
      icon: MessageCircleOutline,
      iconActive: MessageCircle,
      title: 'Messenger',
    },
    { href: '/search', icon: SearchOutline, title: 'Search' },
  ],
  usersActions: [{ icon: LogOutOutline, title: 'Log Out' }],
}

//types

export type MenuItemsType = {
  additional: MenuItemType[]
  mainActions: MenuItemType[]
  usersActions: MenuItemType[]
}
export type MenuItemType = {
  href?: string
  icon: React.ComponentType
  iconActive?: React.ComponentType
  onClick?: () => void
  title: string
}
