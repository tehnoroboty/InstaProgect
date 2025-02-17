import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from '@/src/components/carousel/carousel'

const meta = {
  argTypes: {},
  component: Carousel,
  tags: ['autodocs'],
  title: 'Components/Carousel',
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const CarouselStory: Story = {
  args: {},
}
