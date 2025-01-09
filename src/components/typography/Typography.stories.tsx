import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/src/components/typography/Typography'
import { Simulate } from 'react-dom/test-utils'
import { boolean } from 'zod'

import input = Simulate.input

const meta = {
  argTypes: {
    lineHeights: {
      control: { type: 'radio' },
      lineHeights: ['s', 'm', 'xl'],
    },
    option: {
      control: { type: 'radio' },
      options: [
        'Large',
        'h1',
        'h2',
        'h3',
        'regular_text16',
        'bold_text16',
        'regular_text14',
        'medium_text14',
        'bold_text14',
        'small_text',
        'semi-bold_small_text',
        'regular_link',
        'small_link',
      ],
    },
    size: {
      control: { type: 'radio' },
      size: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    weight: {
      control: { type: 'radio' },
      weight: ['regular', 'medium', 'semi-bold', 'bold'],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'Large',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'h3',
  },
}

export const Regular_text16: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'regular_text16',
  },
}
export const Bold_text16: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'bold_text16',
  },
}

export const Regular_text14: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'regular_text14',
  },
}
//
export const Medium_text14: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'medium_text14',
  },
}

export const Bold_text14: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'bold_text14',
  },
}

export const Small_text: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'small_text',
  },
}

export const Semi_bold_small_text: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'semi-bold_small_text',
  },
}

export const Regular_link: Story = {
  args: {
    as: 'a',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'regular_link',
  },
}

export const Small_link: Story = {
  args: {
    as: 'a',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'small_link',
  },
}

export const Label = {
  render: () => (
    <>
      <Typography as={'label'} htmlFor={'username'} option={'regular_text14'}>
        Click me
      </Typography>
      <input id={'username'} type={'checkbox'} />
    </>
  ),
}

export const DisabledLabel = {
  render: () => (
    <>
      <Typography as={'label'} disable htmlFor={'username'} option={'regular_text14'}>
        Click me
      </Typography>
      <input id={'username'} type={'checkbox'} />
    </>
  ),
}
