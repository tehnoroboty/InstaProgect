'use client'
import React from 'react'

import { MenuItemsType } from '@/src/widgets/navigationPanel/NavigationPanel'
import { MenuSection } from '@/src/widgets/navigationPanel/sidebar/menuSection/MenuSection'
import clsx from 'clsx'

import s from './sidebar.module.scss'

type Props = {
  items: MenuItemsType
}

const Sidebar = ({ items }: Props) => {
  return (
    <aside className={s.sidebar}>
      <nav className={s.container}>
        {items.mainActions && <MenuSection className={s.menuItems} items={items.mainActions} />}
        {items.additional && <MenuSection className={s.menuItems} items={items.additional} />}
        {items.usersActions && (
          <MenuSection className={clsx(s.menuItems, s.userActions)} items={items.usersActions} />
        )}
      </nav>
    </aside>
  )
}

export default Sidebar
