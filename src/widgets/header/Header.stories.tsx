import type { Meta, StoryObj } from '@storybook/react'

import { StoreWrapper } from '@/src/shared/model/store/StoreWrapper'

import { Header } from './Header'

const meta = {
  argTypes: {
    title: { control: 'text' },
  },
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Momenttify',
  },
  render: args => {
    return (
      <StoreWrapper>
        <Header {...args} />
      </StoreWrapper>
    )
  },
}
