import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

/**
 * Button component.
 *
 * @param {React.ElementType} [as] - The type of element to be used (e.g., 'button', 'a', etc.).
 *
 * @param {boolean} [fullWidth] - Indicates whether the button should take the full width of the container.
 *
 * @param {'primary' | 'secondary'} [variant] - The style variant of the button.
 *
 * @param {boolean} [loading] - Indicates whether the button is in a loading state.
 *
 * @param {boolean} [disabled] - Indicates whether the button is disabled.
 *
 * @param {string} [backgroundColor] - The background color of the button.
 *
 * @param {string} [color] - The text color of the button.
 *
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Click event handler.
 *
 * @param {React.FocusEventHandler<HTMLButtonElement>} [onFocus] - Focus event handler.
 *
 * @param {React.ReactNode} children - The content of the button.
 *
 */

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
    as: 'a',
    children: 'Link that looks like a button',
    href: 'https://www.google.ru/?hl=ru',
    variant: 'primary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
