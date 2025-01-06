import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'bordered', 'transparent'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button ',
    disabled: false,
    variant: 'secondary',
  },
}

export const BorderedButton: Story = {
  args: {
    children: 'Button ',
    disabled: false,
    variant: 'bordered',
  },
}

export const TransparentButton: Story = {
  args: {
    children: 'Button ',
    disabled: false,
    variant: 'transparent',
  },
}

export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
    href: 'https://www.google.ru/?hl=ru',
  },
}
