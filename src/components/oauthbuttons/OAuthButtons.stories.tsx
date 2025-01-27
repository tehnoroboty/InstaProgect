import type { Meta, StoryObj } from '@storybook/react'

import { OAuthButtons } from './OAuthButtons'

const meta = {
  argTypes: {},
  component: OAuthButtons,
  tags: ['autodocs'],
  title: 'Components/OAuthButtons',
} satisfies Meta<typeof OAuthButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: args => {
    return <OAuthButtons {...args} />
  },
}
