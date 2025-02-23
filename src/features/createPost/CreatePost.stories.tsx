import React, { useState } from 'react'

import { CreatePost } from '@/src/features/createPost/CreatePost'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Title } from '@radix-ui/react-dialog'
import { Meta, StoryObj } from '@storybook/react'

import s from './dialog.module.scss'

import { Button } from '../../shared/ui/button/Button'

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
