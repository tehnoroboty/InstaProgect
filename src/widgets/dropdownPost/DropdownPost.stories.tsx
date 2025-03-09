import { Meta, StoryObj } from '@storybook/react'

import { DropdownPost } from './DropdownPost'

const meta: Meta<typeof DropdownPost> = {
  argTypes: {
    isFollowedBy: { control: 'boolean' },
    isOurPost: { control: 'boolean' },
  },
  component: DropdownPost,
  title: 'Components/DropdownPost',
}

export default meta

type Story = StoryObj<typeof DropdownPost>

export const OurPost: Story = {
  args: {
    isFollowedBy: false,
    isOurPost: true,
  },
}

export const FollowedPost: Story = {
  args: {
    isFollowedBy: true,
    isOurPost: false,
  },
}

export const NonFollowedPost: Story = {
  args: {
    isFollowedBy: false,
    isOurPost: false,
  },
}
