import type { Meta, StoryObj } from '@storybook/react'
import { ScrollBar } from '@/src/components/scroll/ScrollBar'

const meta = {
  argTypes: {},
  component: ScrollBar,
  tags: ['autodocs'],
  title: 'Components/ScrollBar',
} satisfies Meta<typeof ScrollBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <p>This is a long piece of content.</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>This is a long piece of content.</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
        <p>Keep adding more paragraphs...</p>
      </>
    ),
  },
}
