import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './Loader'

const meta = {
  argTypes: {},
  component: Loader,
  tags: ['autodocs'],
  title: 'Components/Loader',
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { color: '#4C8DFF', size: 20 },
  render: args => {
    return (
      <div
        style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <Loader {...args} />
      </div>
    )
  },
}
