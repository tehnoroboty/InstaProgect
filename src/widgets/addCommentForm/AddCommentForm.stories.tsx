import { AddCommentForm } from '@/src/widgets/addCommentForm/AddCommentForm'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof AddCommentForm> = {
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'Текст кнопки отправки',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокировка формы',
    },
    onCommentAdded: { action: 'commentAdded' },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер текстового поля',
    },
  },
  args: {
    onCommentAdded: fn(),
    postId: 1,
  },
  component: AddCommentForm,
  tags: ['autodocs'],
  title: 'Components/AddCommentForm',
}

export default meta
type Story = StoryObj<typeof AddCommentForm>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    buttonText: 'Disabled',
    disabled: true,
  },
}
