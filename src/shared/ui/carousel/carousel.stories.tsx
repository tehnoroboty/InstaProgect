import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import Image from 'next/image'

import sliderImage from './assets/slider.jpg'

const meta = {
  argTypes: {},
  component: Carousel,
  tags: ['autodocs'],
  title: 'Components/Carousel',
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const SmallCarousel: Story = {
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide2', img: sliderImage },
      { id: 'slide3', img: sliderImage },
    ],
    renderItem: (item: any) => <Image alt={'image'} src={item.img} />,
    size: 'small',
  },
}

export const CarouselWithoutRenderItem: Story = {
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide2', img: sliderImage },
      { id: 'slide3', img: sliderImage },
    ],
  },
}

export const LargeCarousel: Story = {
  args: {
    ...SmallCarousel.args,
    size: 'large',
  },
}
