import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { TextArea, TextAreaProps } from '@/src/components/text-area/TextArea'

const meta = {
  argTypes: {},
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

const InputWrapper = (props: TextAreaProps) => {
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setValue('')
  }

  return <TextArea {...props} value={value} onClear={onClear} onChange={onChange} />
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

// export const Default: Story = {
//   args: {
//     disabled: false,
//   },
// }

// export const Error: Story = {
//   args: {
//     error: 'Text Error',
//   },
// }


