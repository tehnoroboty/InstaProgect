import type { Meta, StoryObj } from '@storybook/react'

import { SelectLanguage } from './SelectLanguage'

const meta = {
  component: SelectLanguage,
  tags: ['autodocs'],
  title: 'Components/SelectBox/SelectLanguage',
} satisfies Meta<typeof SelectLanguage>

export default meta
type Story = StoryObj<typeof meta>

export const Language: Story = {
  args: {
    disabled: false,
  },
}
