import React from 'react'

import ExpandOutline from '@/src/shared/assets/componentsIcons/ExpandOutline'
import { PopoverComponent } from '@/src/shared/ui/popover/Popover'
import { Meta, StoryObj } from '@storybook/react'

import s from '@/src/features/croppingPhoto/croppingPhoto.module.scss' // Предположим,

const meta: Meta<typeof PopoverComponent> = {
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['center', 'end', 'start'],
    },
    children: {
      control: { type: 'text' },
    },
  },
  component: PopoverComponent,
  tags: ['autodocs'],
  title: 'Components/PopoverComponent',
}

export default meta

type Story = StoryObj<typeof PopoverComponent>

export const Default: Story = {
  args: {
    children: 'This is a popover content!',
    icon: <ExpandOutline color={'white'} />,
    iconActive: <ExpandOutline className={s.active} />,
  },
}

export const Centered: Story = {
  args: {
    ...Default.args,
    align: 'center',
  },
}

export const EndAligned: Story = {
  args: {
    ...Default.args,
    align: 'end',
  },
}

export const StartAligned: Story = {
  args: {
    ...Default.args,
    align: 'start',
  },
}
