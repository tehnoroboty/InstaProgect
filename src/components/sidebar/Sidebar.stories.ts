import type { Meta, StoryObj } from '@storybook/react'

import { Home, HomeLine, PlusSquare, PlusSquareOutline } from '@/src/assets/componentsIcons/index'
import Sidebar, { MenuItemType } from '@/src/components/sidebar/Sidebar'

const meta = {
  component: Sidebar,
  tags: ['autodocs'],
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const menuItemsMock: MenuItemType[] = [
  { href: '/', icon: HomeLine, iconActive: Home, title: 'Home' },
  { href: '/create', icon: PlusSquareOutline, iconActive: PlusSquare, title: 'Create' },
]

export const Primary: Story = {
  args: {
    menuItems: {
      additional: [],
      mainActions: menuItemsMock,
      usersActions: [],
    },
  },
}
