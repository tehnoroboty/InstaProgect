import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { TextArea } from '@/src/shared/ui/textArea/TextArea'

const meta = {
  argTypes: { disabled: { control: 'boolean' } },
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Error: Story = {
  args: {
    error: 'Text Error',
  },
}

export const maxValue: Story = {
  render: args => {
    const [text, setText] = useState('')
    const [error, setError] = useState<string>()
    const maxLength = 20
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value)
      if (e.currentTarget.value.length > maxLength) {
        setError('ERROR')
      } else {
        setError('')
      }
    }

    return (
      <TextArea
        error={error}
        maxLength={maxLength}
        onChange={onChangeHandler}
        value={text}
        {...args}
      />
    )
  },
}
