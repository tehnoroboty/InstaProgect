import type { Meta, StoryObj } from '@storybook/react'

import { RegisteredUsersCounter } from '@/src/components/registeredUsersCounter/RegisteredUsersCounter'

const meta = {
  argTypes: { userCount: { type: 'number' } },
  component: RegisteredUsersCounter,
  tags: ['autodocs'],
  title: 'Components/RegisteredUsersCounter',
} satisfies Meta<typeof RegisteredUsersCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { userCount: 9213 },
  render: args => {
    return <RegisteredUsersCounter {...args} />
  },
}
