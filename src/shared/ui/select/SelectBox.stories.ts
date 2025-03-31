import type { Meta, StoryObj } from '@storybook/react'

import { SelectBox } from './SelectBox'

const meta = {
  args: {
    options: [
      { value: 'value1', valueTitle: 'Value-1' },
      { value: 'value2', valueTitle: 'Value-2' },
      { value: 'value3', valueTitle: 'Value-3' },
      { value: 'value4', valueTitle: 'Value-4' },
      { value: 'value5', valueTitle: 'Value-5' },
    ],
  },
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

export const IsDisabled: Story = {
  args: {
    disabled: true,
    label: 'Some label',
    placeholder: 'Value',
  },
}

export const isPagination: Story = {
  args: {
    isPagination: true,
    options: [
      { value: '10', valueTitle: '10' },
      { value: '20', valueTitle: '20' },
      { value: '30', valueTitle: '30' },
    ],
  },
}
