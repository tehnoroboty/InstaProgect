import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta = {
  argTypes: {},
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
  args: {
    children: 'We have sent a link to confirm your email to epam@epam.com',
  },
}
