import * as React from 'react'

export type MenuItemsType = {
  additional: MenuItemType[]
  mainActions: MenuItemType[]
  usersActions: MenuItemType[]
}
export type MenuItemType = {
  href?: string
  icon: React.ComponentType
  iconActive?: React.ComponentType
  id?: string
  onClick?: () => void
  title: string
}
