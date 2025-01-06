import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/src/components/typography/Typography'

const meta = {
  argTypes: {
    option: {
      control: { type: 'radio' },
      options: ['Large', 'h1', 'h2', 'h3', 'text', 'link'],
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
    option: 'text',
    size: 'large',
    weight: 'regular',
  },
}

export const Bold_text16: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'text',
    size: 'large',
    weight: 'bold',
  },
}

export const Regular_text14: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'text',
    size: 'medium',
    weight: 'regular',
  },
}

export const Medium_text14: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'text',
    size: 'medium',
    weight: 'medium',
  },
}

export const Bold_text14: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'text',
    size: 'medium',
    weight: 'bold',
  },
}

export const Small_text: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'text',
    size: 'small',
    weight: 'regular',
  },
}

export const Semi_bold_small_text: Story = {
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'text',
    size: 'small',
    weight: 'semi-bold',
  },
}

export const Regular_link: Story = {
  args: {
    as: 'a',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'link',
    size: 'medium',
    weight: 'regular',
  },
}

export const Small_link: Story = {
  args: {
    as: 'a',
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    option: 'link',
    size: 'small',
    weight: 'regular',
  },
}
