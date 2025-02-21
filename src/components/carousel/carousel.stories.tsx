import type { Meta, StoryObj } from '@storybook/react'

import { Arousel } from '@/src/components/carousel/Carousel'
import Image from 'next/image'

import sliderImage from './assets/slider.jpg'

const meta = {
  argTypes: {},
  component: Arousel,
  tags: ['autodocs'],
  title: 'Components/Carousel',
} satisfies Meta<typeof Arousel>

export default meta
type Story = StoryObj<typeof meta>

export const CarouselStory: Story = {
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
    ],
    renderItem: (item: any) => <Image alt={'image'} src={item.img} />,
  },
}
