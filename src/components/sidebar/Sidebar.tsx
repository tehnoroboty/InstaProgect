'use client'
import React from 'react'

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
} from '@/src/assets/componentsIcons/index'
import { MenuSection } from '@/src/components/sidebar/menuSection/MenuSection'

import s from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <aside className={s.sidebar}>
      <nav className={s.container}>
        {menuItems.mainActions && (
          <MenuSection className={s.menuItems} items={menuItems.mainActions} />
        )}
        {menuItems.additional && (
          <MenuSection className={s.menuItems} items={menuItems.additional} />
        )}
        {menuItems.usersActions && (
          <MenuSection
            className={`${s.menuItems} ${s.userActions} `}
            items={menuItems.usersActions}
          />
        )}
      </nav>
    </aside>
  )
}

export default Sidebar

const menuItems: MenuItemsType = {
  additional: [
    { href: '/statistics', icon: TrendingUpOutline, title: 'Statistics' },
    { href: '/favorites', icon: BookmarkOutline, iconActive: Bookmark, title: 'Favorites' },
  ],
  mainActions: [
    { href: '/', icon: HomeLine, iconActive: Home, title: 'Home' },
    { href: '/create', icon: PlusSquareOutline, iconActive: PlusSquare, title: 'Create' },
    { href: '/my-profile', icon: PersonOutline, iconActive: Person, title: 'My Profile' },
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

type MenuItemsType = {
  additional: MenuItemType[]
  mainActions: MenuItemType[]
  usersActions: MenuItemType[]
}
export type MenuItemType = {
  href?: string
  icon: React.ComponentType
  iconActive?: React.ComponentType
  title: string
}
