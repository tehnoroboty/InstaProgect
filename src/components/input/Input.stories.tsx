import { ChangeEvent, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import s from './Input.module.scss'

import { Input, InputProps } from './Input'

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    id: 'forInput',
    label: '',
    placeholder: 'Enter text',
  },
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

const InputWrapper = (props: InputProps) => {
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setValue('')
  }

  return <Input {...props} onChange={onChange} onClear={onClear} value={value} />
}

export const InputWithLabel: Story = {
  args: {
    label: 'Text input',
  },
  render: args => {
    return (
      <>
        <InputWrapper {...args} />
      </>
    )
  },
}

export const InputWithoutLabel: Story = {
  render: args => <InputWrapper {...args} />,
}

export const InputError: Story = {
  args: {
    error: 'Error message',
    label: 'Text input with error',
  },

  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const InputDisabled: Story = {
  args: {
    // disabled: true,
    label: 'Text input disabled',
  },

  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const SearchInputWithLabel: Story = {
  args: {
    label: 'Search',
    type: 'search',
  },
  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const SearchInputWithoutLabel: Story = {
  args: {
    type: 'search',
  },
  render: args => <InputWrapper {...args} />,
}

export const SearchInputError: Story = {
  args: {
    error: 'Error',
    label: 'Search and error',
    type: 'search',
  },

  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const SearchInputDisabled: Story = {
  args: {
    disabled: true,
    label: 'Search input disabled',
    type: 'search',
  },

  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const PasswordInputWithLabel: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },

  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const PasswordInputWithoutLabel: Story = {
  args: {
    type: 'password',
  },

  render: args => <InputWrapper {...args} />,
}

export const PasswordInputError: Story = {
  args: {
    error: 'Error',
    label: 'Password Error',
    placeholder: undefined,
    type: 'password',
  },

  render: args => (
    <>
      <InputWrapper {...args} />
    </>
  ),
}

export const PasswordInputDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password input disabled',
    placeholder: '',
    type: 'password',
  },

  render: args => (
    <>
      <InputWrapper {...args} className={s.customWidth} />
    </>
  ),
}
