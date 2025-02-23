import { CreatePost } from '@/src/features/createPost/CreatePost'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {},
  args: {},
  component: CreatePost,
  tags: ['autodocs'],
  title: 'Components/CreatePost',
} satisfies Meta<typeof CreatePost>

export default meta
type Story = StoryObj<typeof CreatePost>

export const Default: Story = {
  args: {},
}
