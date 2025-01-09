import { ChangeEvent, useState } from 'react'

import { Input, InputProps } from '@/src/components/input/Input'
import { Typography } from '@/src/components/typography/Typography'
import { Meta, StoryObj } from '@storybook/react'

import s from './Input.module.scss'

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    id: 'forInput',
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
  render: args => {
    return (
      <>
        <Typography as={'label'} htmlFor={args.id}>
          Text input
        </Typography>
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
    error: 'Error',
  },

  render: args => (
    <>
      <Typography as={'label'} className={`${args.disabled ? s.disabled : ''}`} htmlFor={args.id}>
        Text input with error
      </Typography>
      <InputWrapper {...args} />
    </>
  ),
}

export const InputDisabled: Story = {
  args: {
    disabled: true,
  },

  render: args => (
    <>
      <Typography as={'label'} className={`${args.disabled ? s.disabled : ''}`} htmlFor={args.id}>
        Text input disabled
      </Typography>
      <InputWrapper {...args} />
    </>
  ),
}

export const SearchInputWithLabel: Story = {
  args: {
    type: 'search',
  },
  render: args => (
    <>
      <Typography as={'label'} htmlFor={args.id}>
        Search
      </Typography>
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
    type: 'search',
  },

  render: args => (
    <>
      <Typography as={'label'} htmlFor={args.id}>
        Search and error
      </Typography>
      <InputWrapper {...args} />
    </>
  ),
}

export const SearchInputDisabled: Story = {
  args: {
    disabled: true,
    type: 'search',
  },

  render: args => (
    <>
      <Typography as={'label'} className={`${args.disabled ? s.disabled : ''}`} htmlFor={args.id}>
        Search input disabled
      </Typography>
      <InputWrapper {...args} />
    </>
  ),
}

export const PasswordInputWithLabel: Story = {
  args: {
    type: 'password',
  },

  render: args => (
    <>
      <Typography as={'label'} htmlFor={args.id}>
        Password
      </Typography>
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
    type: 'password',
  },

  render: args => (
    <>
      <Typography as={'label'} htmlFor={args.id}>
        Password Error
      </Typography>
      <InputWrapper {...args} />
    </>
  ),
}

export const PasswordInputDisabled: Story = {
  args: {
    disabled: true,
    type: 'password',
  },

  render: args => (
    <>
      <label className={`${s.label} ${args.disabled ? s.disabled : ''}`} htmlFor={'textfield'}>
        <p className={'s.regular14'}>Text input</p>
      </label>
      <Typography
        as={'label'}
        className={`${args.disabled ? s.disabled : ''}`}
        htmlFor={'textField'}
      >
        Password input disabled
      </Typography>
      <InputWrapper {...args} />
    </>
  ),
}
