import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  args: {},
  component: CreatePostPhoto,
  tags: ['autodocs'],
  title: 'Components/CreatePostPhoto',
} satisfies Meta<typeof CreatePostPhoto>

export default meta
type Story = StoryObj<typeof CreatePostPhoto>

export const Default: Story = {
  args: {},
}
