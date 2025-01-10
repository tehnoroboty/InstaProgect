import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Typography } from '@/src/components/typography/Typography'

import s from './typography.module.scss'

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
  args: {
    children: 'Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
  },

  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    option: 'Large',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    option: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    option: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    option: 'h3',
  },
}

export const Regular_text16: Story = {
  args: {
    option: 'regular_text16',
  },
}

export const Bold_text16: Story = {
  args: {
    option: 'bold_text16',
  },
}

export const Regular_text14: Story = {
  args: {
    option: 'regular_text14',
  },
}

export const Medium_text14: Story = {
  args: {
    option: 'medium_text14',
  },
}

export const Bold_text14: Story = {
  args: {
    option: 'bold_text14',
  },
}

export const Small_text: Story = {
  args: {
    option: 'small_text',
  },
}

export const Semi_bold_small_text: Story = {
  args: {
    option: 'semi-bold_small_text',
  },
}

export const Regular_link: Story = {
  args: {
    as: 'a',
    option: 'regular_link',
  },
}

export const Small_link: Story = {
  args: {
    as: 'a',
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

export const DisabledLabel = () => {
  const [disabledLabel, setDisabledLabel] = useState<boolean>(false)

  const onChangeDisabled = () => {
    setDisabledLabel(!disabledLabel)
  }

  return (
    <>
      <div>
        <Typography
          as={'label'}
          disabled={disabledLabel}
          htmlFor={'username'}
          option={'regular_text14'}
        >
          Click me
        </Typography>
        <input disabled={disabledLabel} id={'username'} type={'checkbox'} />
      </div>
      <button onClick={onChangeDisabled}>disabled checkbox</button>
    </>
  )
}
