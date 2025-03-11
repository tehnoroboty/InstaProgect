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
      { id: 'slide1', src: sliderImage },
      { id: 'slide2', src: sliderImage },
      { id: 'slide3', src: sliderImage },
    ],
    renderItem: (item: any) => (
      <Image alt={'image'} height={item.src.height} src={item.src.src} width={item.src.width} />
    ),
    size: 'small',
  },
}

export const LargeCarousel: Story = {
  args: {
    list: [
      { id: 'slide1', src: sliderImage },
      { id: 'slide2', src: sliderImage },
      { id: 'slide3', src: sliderImage },
    ],
    renderItem: (item: any) => (
      <Image alt={'image'} height={item.src.height} src={item.src.src} width={item.src.width} />
    ),
    size: 'large',
  },
}

export const CarouselWithoutRenderItem: Story = {
  args: {
    list: [
      { id: 'slide1', src: sliderImage },
      { id: 'slide2', src: sliderImage },
      { id: 'slide3', src: sliderImage },
    ],
  },
}
