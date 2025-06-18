import type { Meta, StoryObj } from '@storybook/react'

import { useId } from 'react'

import { Dropdown, DropdownMenuItems } from './Dropdown'
import {
  BookmarkOutline,
  Edit2Outline,
  LogOutOutline,
  MoreHorizontalOutline,
  SettingsOutline,
  TrashOutline,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { DropdownItem } from '@/src/shared/ui/dropdown/dropdownItem/DropdownItem'

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

const menuDropdown: DropdownMenuItems[] = [
  {
    icon: Edit2Outline,
    id: '1',
    onClick: () => {
      console.log('Edit Post')
    },
    title: 'Edit Post',
  },
  {
    icon: TrashOutline,
    id: '2',
    onClick: () => {
      console.log('Delete Post')
    },
    title: 'Delete Post',
  },
]

export const DropdownPostSettingsWithRenderItem: Story = {
  args: {
    list: menuDropdown,
    renderItem: (item: any) => (
      <DropdownItem Icon={item.icon} key={useId()} onClick={item.onClick} title={item.title} />
    ),
  },
}
export const DropdownPostSettingsWithoutRenderItem: Story = {
  args: {
    list: menuDropdown,
  },
}

const menuHeaderMobile: DropdownMenuItems[] = [
  {
    href: '/statistics',
    icon: TrendingUpOutline,
    id: '3',
    title: 'Statistics',
  },
  {
    href: '/favorites',
    icon: BookmarkOutline,
    id: '4',
    title: 'Favorites',
  },
  { href: '/settings', icon: SettingsOutline, id: '5', title: 'Profile Settings' },
  {
    icon: LogOutOutline,
    id: '6',
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
