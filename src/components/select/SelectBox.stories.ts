import type { Meta, StoryObj } from '@storybook/react'

import { SelectBox } from './SelectBox'

const meta = {
  component: SelectBox,
  tags: ['autodocs'],
  title: 'Components/SelectBox',
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Value',
  },
}

export const Label: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Value',
  },
}

export const LabelSize: Story = {
  args: {
    label: 'Some label',
    placeholder: 'Value',
    size: 'medium',
  },
}

export const IsDisabled: Story = {
  args: {
    disabled: true,
    label: 'Some label',
    placeholder: 'Value',
  },
}
