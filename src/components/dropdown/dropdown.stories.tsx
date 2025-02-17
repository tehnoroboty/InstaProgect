import type { Meta, StoryObj } from '@storybook/react'

import React, { useId } from 'react'

import { Edit2Outline, MoreHorizontalOutline, TrashOutline } from '@/src/assets/componentsIcons'
import { DropdownItem } from '@/src/components/dropdown/dropdownItem/dropdownItem'

import { Dropdown } from './dropdown'

const meta = {
  argTypes: {},
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

type ItemType = {
  icon: React.ComponentType
  iconActive?: React.ComponentType
  onClick: () => void
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

export const DropdownStory: Story = {
  args: {
    list: menuDropdown,
    renderItem: (item: any) => (
      <DropdownItem Icon={item.icon} key={useId()} onClick={item.onClick} title={item.title} />
    ),
    trigger: (
      <button aria-label={'Customize options'} type={'button'}>
        <MoreHorizontalOutline height={24} viewBox={`1 3 20 20`} />
      </button>
    ),
  },
}
