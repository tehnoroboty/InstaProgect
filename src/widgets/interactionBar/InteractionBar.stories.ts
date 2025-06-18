import type { Meta, StoryObj } from '@storybook/react'

import { InteractionBar } from './InteractionBar'

const meta = {
  argTypes: {
    hasCommentIcon: { control: 'boolean' },
  },
  args: {
    hasCommentIcon: true,
  },
  component: InteractionBar,
  tags: ['autodocs'],
  title: 'Components/InteractionBar',
} satisfies Meta<typeof InteractionBar>

export default meta
type Story = StoryObj<typeof meta>

export const WithCommentIcon: Story = {
  args: {
    hasCommentIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of the Interaction Bar component with a comment icon.',
      },
    },
  },
}

export const WithoutCommentIcon: Story = {
  args: {
    hasCommentIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of the Interaction Bar component without the comment icon.',
      },
    },
  },
}
