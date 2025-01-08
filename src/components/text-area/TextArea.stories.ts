import type { Meta, StoryObj } from '@storybook/react'

import { TextArea, TextAreaProps } from '@/src/components/text-area/TextArea'

const meta = {
  argTypes: {},
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
  },
}

export const Error: Story = {
  args: {
    error: 'Text Error',
  },
}
