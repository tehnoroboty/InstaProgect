import type { Meta, StoryObj } from '@storybook/react'

import { StoreWrapper } from '../../shared/model/store/StoreWrapper'
import { NavigationPanel } from './NavigationPanel'

const meta = {
  component: NavigationPanel,
  decorators: [story => <StoreWrapper>{story()}</StoreWrapper>],
  tags: ['autodocs'],
  title: 'Components/NavigationPanel',
} satisfies Meta<typeof NavigationPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
