import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'bordered', 'transparent'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button ',
    disabled: false,
  },
}

export const BordredButton: Story = {
  args: {
    variant: 'bordered',
    children: 'Button ',
    disabled: false,
  },
}
export const TransparentButton: Story = {
  args: {
    variant: 'transparent',
    children: 'Button ',
    disabled: false,
  },
}
