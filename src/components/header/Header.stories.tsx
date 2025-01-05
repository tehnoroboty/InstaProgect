import type { Meta, StoryObj } from '@storybook/react'
import { HeaderW } from '@/src/components/header/header-web/HeaderW'

const meta = {
  argTypes: {
    title: { control: 'text' },
  },
  component: HeaderW,
  tags: ['autodocs'],
  title: 'Components/HeaderW',
} satisfies Meta<typeof HeaderW>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Momenttify',
    isLoggedIn: true,
  },
}
