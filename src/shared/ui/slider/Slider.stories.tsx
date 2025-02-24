import type { Meta, StoryObj } from '@storybook/react'

import { SliderComponent } from '@/src/shared/ui/slider/Slider'

const meta = {
  argTypes: {},
  component: SliderComponent,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof SliderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          alignItems: 'center',
          border: '1px solid blue',
          display: 'flex',
          justifyContent: 'center',
          width: '100px',
        }}
      >
        <SliderComponent />
      </div>
    )
  },
}
