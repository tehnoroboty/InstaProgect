import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/src/shared/ui/recaptcha/Recaptcha'

const meta = {
  component: Recaptcha,
  tags: ['autodocs'],
  title: 'Components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Primory: Story = {
  args: {
    onChangeValue: (value: null | string) => {
      console.log('Recaptcha value changed:', value)
    },
  },
}
