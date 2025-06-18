import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './Header'
import { StoreWrapper } from '@/src/shared/model/store/StoreWrapper'

const meta = {
  argTypes: {
    title: { control: 'text' },
  },
  component: Header,
  decorators: [story => <StoreWrapper>{story()}</StoreWrapper>],
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Momenttify',
  },
}
