import * as React from 'react'

import { PropsSlider, SliderComponent } from '@/src/shared/ui/slider/Slider'
import { Meta, StoryFn } from '@storybook/react'

export default {
  argTypes: {
    setVolume: { action: 'volumeChanged' },
    zoom: {
      control: { max: 2, min: 0.8, step: 0.1, type: 'range' },
    },
  },
  component: SliderComponent,
  tags: ['autodocs'],
  title: 'Components/SliderComponent',
} as Meta<typeof SliderComponent>

const Template: StoryFn<PropsSlider> = args => <SliderComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  zoom: 1,
}
