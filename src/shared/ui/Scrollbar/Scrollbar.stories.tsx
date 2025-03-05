import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { ScrollArea, ScrollBar } from '@/src/shared/ui/Scrollbar/Scrollbar'
import s from './scrollbar.module.scss'

const meta = {
  args: {},
  component: ScrollArea,
  tags: ['autodocs'],
  title: 'Components/ScrollBar',
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof ScrollArea>

const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam doloremque et,
eveniet facilis impedit inventore iste, itaque molestias qui quibusdam repellendus sequi sunt. Aut,
cum, temporibus? Amet eos et quidem. Lorem ipsum dolor sit amet, consectetur adipisicing
elit. Facere provident quidem unde veritatis? Autem consectetur, debitis distinctio dolore
eos illum magni necessitatibus nemo nobis numquam provident sequi temporibus ullam,
voluptate. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores debitis
dolorem, facere illum incidunt molestias natus neque optio quaerat quos sequi similique sit
temporibus ut velit voluptas voluptatibus. Fugit, vel? Lorem ipsum dolor sit amet,
consectetur adipisicing elit. Cupiditate expedita iure laboriosam, molestias quae quis vero
voluptatum? Asperiores, pariatur, temporibus. Dignissimos dolores ducimus libero numquam qui
quos tenetur, vel voluptate?`

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className={s.verticalScroll}>
      <div style={{ width: '100%', fontWeight: 900, backgroundColor: 'lightgreen' }}>
        Vertical Scroll
      </div>

      <Typography>{text}</Typography>
    </ScrollArea>
  ),
}
export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className={s.horizontalScroll}>
      <div style={{ width: '100%', fontWeight: 900, backgroundColor: 'lightblue' }}>
        Horizontal Scroll
      </div>
      <Typography className={s.text}>{text}</Typography>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const BothScroll: Story = {
  render: () => (
    <div>
      <ScrollArea className={s.verticalScroll}>
        <div style={{ width: '100%', fontWeight: 900, backgroundColor: 'violet' }}>Both Scroll</div>
        <div style={{ width: '200px', height: '200px' }}>
          <Typography className={s.text}>{text}</Typography>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
}
