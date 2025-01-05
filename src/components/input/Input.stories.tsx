import { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select', options: ['text', 'password', 'email'] },
      description: 'Тип ввода',
    },
    className: { control: 'text', description: 'Дополнительный класс' },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Введите текст...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль...',
  },
}

export const WithClassName: Story = {
  args: {
    type: 'text',
    placeholder: 'С кастомным классом',
    className: 'border-2 border-blue-500', // Пример добавления класса
  },
}
