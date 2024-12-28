import type { Meta, StoryObj } from '@storybook/react'
import { CheckBox } from '@/src/components/checkbox/CheckBox'

const meta = {
  title: 'Components/Checkbox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'text',
    disabled: false,
  },
}
