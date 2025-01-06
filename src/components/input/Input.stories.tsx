import { Meta, StoryObj } from '@storybook/react'
import { Input, InputProps } from '@/src/components/input/Input'
import { ChangeEvent, useState } from 'react'
import s from './Input.module.scss'

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    id: 'forInput',
    error: '',
  },
}

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

  return <Input {...props} value={value} onClear={onClear} onChange={onChange} />
}

export const InputWithLabel: Story = {
  render: args => {
    return (
      <>
        <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
          <p className={'s.regular16'}>Text input</p>
        </label>
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
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Text input with error</p>
      </label>
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
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Text input disabled</p>
      </label>
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
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Search</p>
      </label>
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
    type: 'search',
    error: 'Error',
  },

  render: args => (
    <>
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Search and error</p>
      </label>
      <InputWrapper {...args} />
    </>
  ),
}

export const SearchInputDisabled: Story = {
  args: {
    type: 'search',
    disabled: true,
  },

  render: args => (
    <>
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Search input disabled</p>
      </label>
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
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Password</p>
      </label>
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
    type: 'password',
    error: 'Error',
  },

  render: args => (
    <>
      <label htmlFor={args.id} className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Password Error</p>
      </label>
      <InputWrapper {...args} />
    </>
  ),
}

export const PasswordInputDisabled: Story = {
  args: {
    type: 'password',
    disabled: true,
  },

  render: args => (
    <>
      <label htmlFor="textfield" className={`${s.label} ${args.disabled ? s.disabled : ''}`}>
        <p className={'s.regular16'}>Text input</p>
      </label>
      <InputWrapper {...args} />
    </>
  ),
}
