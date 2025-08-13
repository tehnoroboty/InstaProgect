import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import { Typography } from '@/src/shared/ui/typography/Typography'

const meta = {
  argTypes: {
    onPageChange: { action: 'page changed' },
    onPageSizeChange: { action: 'page size changed' },
  },
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

// Моковые данные для демонстрации
const mockPaginationProps = {
  currentPage: 1,
  pageSize: 10,
  siblingCount: 1,
  totalCount: 100,
}

export const InteractiveDemo: Story = {
  args: { ...mockPaginationProps },
  render: args => {
    const [page, setPage] = useState(args.currentPage)
    const [size, setSize] = useState(args.pageSize)

    return (
      <div>
        <Pagination
          {...args}
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={setSize}
          pageSize={size}
        />
        <div>
          <Typography>Current page: {page}</Typography>
          <Typography>Items per page: {size}</Typography>
          <Typography>Total number of items: {args.totalCount}</Typography>
        </div>
      </div>
    )
  },
}

export const WithCustomSiblingCount: Story = {
  args: { ...mockPaginationProps, currentPage: 5, siblingCount: 2 },
  render: args => {
    return (
      <div>
        <Typography>With 2 sibling pages visible</Typography>
        <Pagination {...args} />
      </div>
    )
  },
}
