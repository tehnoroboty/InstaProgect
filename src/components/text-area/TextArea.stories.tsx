import type { Meta, StoryObj } from '@storybook/react'

import { ChangeEvent, useState } from 'react'

import { TextArea, TextAreaProps } from '@/src/components/text-area/TextArea'

const meta = {
  argTypes: { disabled: { control: 'boolean' } },
  component: TextArea,
  tags: ['autodocs'],
  title: 'Components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

// const TextAreaWrapper = (props: TextAreaProps) => {
//   const [value, setValue] = useState('')

//   const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setValue(e.target.value)
//   }

//   const onClear = () => {
//     setValue('')
//   }

//   return <TextArea {...props} onChange={onChange} onClear={onClear} value={value} />
// }

export const Default: Story = {
  render: args => {
    return <TextArea />
  },
}

export const Disabled: Story = {
  render: args => {
    return <TextArea disabled />
  },
}

export const Error: Story = {
  args: {
    error: 'Text Error',
  },
}
