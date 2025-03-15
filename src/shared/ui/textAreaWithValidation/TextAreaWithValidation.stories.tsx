import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'

import { Button } from '../button/Button'

const meta = {
  args: { maxLength: 10 },
  component: TextAreaWithValidation,
  tags: ['autodocs'],
  title: 'Components/TextAreaWithValidation',
} satisfies Meta<typeof TextAreaWithValidation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithOnErrorChange: Story = {
  args: {
    label: 'Комментарий',
    maxLength: 10,
    placeholder: 'Введите комментарий',
  },
  render: args => {
    const [error, setError] = useState<string | undefined>(undefined)

    const handleErrorChange = (error: string | undefined) => {
      setError(error)
    }

    return (
      <>
        <TextAreaWithValidation maxLength={5} onErrorChange={handleErrorChange} />
        <Button disabled={!!error}>Button</Button>
      </>
    )
  },
}
