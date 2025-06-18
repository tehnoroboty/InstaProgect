import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '../button/Button'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'

const meta = {
  argTypes: { disabled: { control: 'boolean' } },
  args: {
    label: 'Описание',
    maxLength: 10,
    onErrorChange: () => {},
    onTextChange: () => {},
    placeholder: 'Введите описание',
  },
  component: TextAreaWithValidation,
  tags: ['autodocs'],
  title: 'Components/TextAreaWithValidation',
} satisfies Meta<typeof TextAreaWithValidation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithErrorAndText: Story = {
  render: () => {
    const [text, setText] = useState('')
    const [error, setError] = useState<string | undefined>(undefined)

    return (
      <>
        <TextAreaWithValidation maxLength={5} onErrorChange={setError} onTextChange={setText} />
        <Button disabled={!!error} style={{ margin: '20px 0' }}>
          Button
        </Button>
        <Typography option={'regular_text16'}>{`Text: ${text}`}</Typography>
      </>
    )
  },
}

export const WithValue: Story = {
  render: () => {
    const [error, setError] = useState<string | undefined>(undefined)

    return (
      <>
        <TextAreaWithValidation maxLength={5} onErrorChange={setError} value={'qqq'} />
        <Button disabled={!!error} style={{ margin: '20px 0' }}>
          Button
        </Button>
      </>
    )
  },
}
