import { ComponentType } from 'react'

export type MenuItemsType = {
  additional: MenuItemType[]
  mainActions: MenuItemType[]
  usersActions: MenuItemType[]
}
export type MenuItemType = {
  href?: string
  icon: ComponentType
  iconActive?: ComponentType
  id?: string
  onClick?: () => void
  title: string
}
