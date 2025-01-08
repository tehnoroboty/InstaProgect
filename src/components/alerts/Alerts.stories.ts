import type { Meta, StoryObj } from '@storybook/react'
import { Alerts } from '@/src/components/alerts/Alerts'

const meta = {
  argTypes: {},
  component: Alerts,
  tags: ['autodocs'],
  title: 'Components/Alerts',
} satisfies Meta<typeof Alerts>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
