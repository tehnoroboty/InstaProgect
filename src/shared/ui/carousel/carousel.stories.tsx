import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from './Carousel'
import sliderImage from './assets/slider.jpg'
import Image from 'next/image'

const meta = {
  argTypes: {},
  component: Carousel,
  tags: ['autodocs'],
  title: 'Components/Carousel',
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const CarouselStorySmall: Story = {
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
    ],
    renderItem: (item: any) => <Image alt={'image'} src={item.img} />,
    size: 'small',
  },
}
export const CarouselStoryLarge: Story = {
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
    ],
    renderItem: (item: any) => <Image alt={'image'} src={item.img} />,
    size: 'large',
  },
}
