import type { Meta, StoryObj } from '@storybook/react'

import { NavigationPanel } from '@/src/components/navigationPanel/NavigationPanel'

const meta = {
  component: NavigationPanel,
  tags: ['autodocs'],
  title: 'Components/NavigationPanel',
} satisfies Meta<typeof NavigationPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
