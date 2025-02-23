import type { Meta, StoryObj } from '@storybook/react'

import React, { useId } from 'react'

import {
  BookmarkOutline,
  Edit2Outline,
  LogOutOutline,
  MoreHorizontalOutline,
  SettingsOutline,
  TrashOutline,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { DropdownItem } from '@/src/shared/ui/dropdown/dropdownItem/dropdownItem'

import { Dropdown } from './dropdown'

const meta = {
  argTypes: {},
  args: {
    trigger: (
      <button type={'button'}>
        <MoreHorizontalOutline height={24} viewBox={`1 3 20 20`} />
      </button>
    ),
  },
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

type ItemType = {
  href?: string
  icon: React.ComponentType
  iconActive?: React.ComponentType
  onClick?: () => void
  title: string
}
const menuDropdown: ItemType[] = [
  {
    icon: Edit2Outline,
    onClick: () => {
      console.log('Edit Post')
    },
    title: 'Edit Post',
  },
  {
    icon: TrashOutline,
    onClick: () => {
      console.log('Delete Post')
    },
    title: 'Delete Post',
  },
]

export const DropdownPostSettings: Story = {
  args: {
    list: menuDropdown,
    renderItem: (item: any) => (
      <DropdownItem Icon={item.icon} key={useId()} onClick={item.onClick} title={item.title} />
    ),
  },
}

const menuHeaderMobile: ItemType[] = [
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
  {
    icon: LogOutOutline,
    onClick: () => {
      console.log('Log Out')
    },
    title: 'Log Out',
  },
]

export const DropdownHeaderMobile: Story = {
  args: {
    list: menuHeaderMobile,
    renderItem: (item: any) => (
      <DropdownItem
        Icon={item.icon}
        href={item.href}
        key={useId()}
        onClick={item.onClick}
        title={item.title}
      />
    ),
  },
}
