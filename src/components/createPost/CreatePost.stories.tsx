import React, { useState } from 'react'

import { CreatePost } from '@/src/components/createPost/CreatePost'
import { Typography } from '@/src/components/typography/Typography'
import { Title } from '@radix-ui/react-dialog'
import { Meta, StoryObj } from '@storybook/react'

import s from './dialog.module.scss'

import { Button } from '../button/Button'

const meta = {
  argTypes: {},
  args: {},
  component: CreatePost,
  tags: ['autodocs'],
  title: 'Components/CreatePost',
} satisfies Meta<typeof CreatePost>

export default meta
type Story = StoryObj<typeof CreatePost>

export const Default: Story = {
  args: {},
}
