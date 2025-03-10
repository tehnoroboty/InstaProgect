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
    list: [{ url: sliderImage }, { url: sliderImage }, { url: sliderImage }],
    renderItem: (item: any) => <Image alt={'image'} height={100} src={item.url} width={100} />,
    size: 'small',
  },
}

export const CarouselWithoutRenderItem: Story = {
  args: {
    list: [{ url: sliderImage }, { url: sliderImage }, { url: sliderImage }],
  },
}

export const LargeCarousel: Story = {
  args: {
    ...SmallCarousel.args,
    size: 'large',
  },
}
