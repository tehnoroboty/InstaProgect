import type { Meta, StoryObj } from '@storybook/react'

import { Carousel } from '@/src/components/carousel/carousel'
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

export const CarouselStory: Story = {
  args: {
    list: [
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
      { id: 'slide1', img: sliderImage },
    ],
    renderItem: (item: any) => <Image alt={'image'} height={503} src={item.img} width={490} />,
  },
}
