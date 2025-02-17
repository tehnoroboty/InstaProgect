import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { TextArea } from '@/src/components/textArea/TextArea'

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
  args: {
    maxValue: 20,
  },
  render: args => {
    const [text, setText] = useState('')
    const [error, setError] = useState<string>()
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value)
      if (e.currentTarget.value.length > 20) {
        setError('ERROR')
      } else {
        setError('')
      }
    }

    return <TextArea error={error} onChange={onChangeHandler} value={text} {...args} />
  },
}
