import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from '@/src/shared/ui/checkbox/CheckBox'

const meta = {
  argTypes: {
    label: {
      control: 'text',
    },
  },
  component: CheckBox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    disabled: false,
    label: 'text',
  },
}
