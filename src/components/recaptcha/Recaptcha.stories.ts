import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from '@/src/components/recaptcha/Recaptcha'

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
      // eslint-disable-next-line no-console
      console.log('Recaptcha value changed:', value)
    },
  },
}
