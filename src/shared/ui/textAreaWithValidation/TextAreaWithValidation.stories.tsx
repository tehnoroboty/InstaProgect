import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'

import { Button } from '../button/Button'

const meta = {
  argTypes: { disabled: { control: 'boolean' } },
  args: {
    error: undefined,
    label: 'Описание',
    maxLength: 10,
    onChange: () => {},
    placeholder: 'Введите описание',
    setError: () => {},
    value: '',
  },
  component: TextAreaWithValidation,
  tags: ['autodocs'],
  title: 'Components/TextAreaWithValidation',
} satisfies Meta<typeof TextAreaWithValidation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [text, setText] = useState('')
    const [error, setError] = useState<string | undefined>(undefined)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value)
    }

    return (
      <TextAreaWithValidation
        {...args}
        error={error}
        onChange={handleChange}
        setError={setError}
        value={text}
      />
    )
  },
}

export const WithError: Story = {
  render: args => {
    const [text, setText] = useState('This text exceeds the maximum length.')
    const [error, setError] = useState<string | undefined>(undefined)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value)
    }

    return (
      <TextAreaWithValidation
        {...args}
        error={error}
        onChange={handleChange}
        setError={setError}
        value={text}
      />
    )
  },
}

export const WithButton: Story = {
  render: args => {
    const [text, setText] = useState('')
    const [error, setError] = useState<string | undefined>(undefined)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.currentTarget.value)
    }

    return (
      <>
        <TextAreaWithValidation
          {...args}
          error={error}
          onChange={handleChange}
          setError={setError}
          value={text}
        />
        <Button disabled={!!error}>Button</Button>
      </>
    )
  },
}
