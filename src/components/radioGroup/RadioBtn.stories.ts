import type { Meta, StoryObj } from '@storybook/react'
import { RadioBtn } from '@/src/components/radioGroup/RadioBtn'

const meta = {
  argTypes: {
    label: {
      control: 'text',
    },
  },
  component: RadioBtn,
  tags: ['autodocs'],
  title: 'Components/RadioBtn',
} satisfies Meta<typeof RadioBtn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    disabled: false,
    label: 'text',
    checked: true,
  },
}
