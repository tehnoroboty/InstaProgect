import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '@/src/components/textArea/TextArea'

const meta = {
  argTypes: { disabled: { control: 'boolean' } },
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    error: 'Text Error',
  },
}
