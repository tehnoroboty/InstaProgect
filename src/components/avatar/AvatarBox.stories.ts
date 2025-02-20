import type { Meta, StoryObj } from '@storybook/react'

import { AvatarBox } from '@/src/components/avatar/AvatarBox'

const meta = {
  argTypes: {},
  component: AvatarBox,
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof AvatarBox>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarWithImage: Story = {
  args: {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKGvxtr7vmYvKw_dBgBPf98isHM4Cz6REorg&s',
  },
}

export const Avatar: Story = {
  args: {
    size: 'xs',
  },
}
