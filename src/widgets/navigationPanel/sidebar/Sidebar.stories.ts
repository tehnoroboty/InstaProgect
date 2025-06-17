import type { Meta, StoryObj } from '@storybook/react'

import Sidebar from '@/src/widgets/navigationPanel/sidebar/Sidebar'
import {MenuItemsType} from "@/src/widgets/navigationPanel/types";
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeLine, LogOutOutline, MessageCircle, MessageCircleOutline, Person, PersonOutline, PlusSquare,
  PlusSquareOutline, SearchOutline,
  TrendingUpOutline
} from "@/src/shared/assets/componentsIcons";

const meta = {
  component: Sidebar,
  tags: ['autodocs'],
  title: 'Components/Sidebar',
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const menuItemsMock:  MenuItemsType = {
  additional: [
    { href: '/statistics', icon: TrendingUpOutline, title: 'Statistics' },
    {
      href: '/favorites',
      icon: BookmarkOutline,
      iconActive: Bookmark,
      title: 'Favorites',
    },
  ],
  mainActions: [
    { href: '/', icon: HomeLine, iconActive: Home, title: 'Home' },
    {
      icon: PlusSquareOutline,
      iconActive: PlusSquare,
      onClick: ()=>{},
      title: 'Create',
    },
    {
      href: `/profile/id`,
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

export const Primary: Story = {
  args: {
    items: {
      additional: menuItemsMock.additional,
      mainActions: menuItemsMock.mainActions,
      usersActions: menuItemsMock.usersActions,
    },
  },
}
