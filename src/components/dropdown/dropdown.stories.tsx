import type { Meta, StoryObj } from '@storybook/react'

import React from 'react'

import { MoreHorizontalOutline } from '@/src/assets/componentsIcons'

import { Dropdown } from './dropdown'

const meta = {
  argTypes: {},
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

type MenuDropdownType = { title: string }

const menuDropdown: MenuDropdownType[] = [
  { title: 'Statistics' },
  { title: 'Favorites' },
  { title: 'Profile Settings' },
]

export const DropdownStory: Story = {
  args: {
    list: menuDropdown,
    renderItem: (item: any) => <span>{item.title}</span>,
    trigger: (
      <button aria-label={'Customize options'} type={'button'}>
        <MoreHorizontalOutline height={24} viewBox={`1 3 20 20`} />
      </button>
    ),
  },
}
