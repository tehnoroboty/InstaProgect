import type { Meta, StoryObj } from '@storybook/react'

import s from './table.module.scss'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof Table>

type TableData = {
  dateOfPayment: string
  endDate: string
  paymentType: string
  price: string
  subscription: string
}

const mockTableData: TableData[] = [
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'Stripe',
    price: '10',
    subscription: '1 day',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'Stripe',
    price: '50',
    subscription: '7 days',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'Stripe',
    price: '100',
    subscription: '1 month',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'PayPal',
    price: '100',
    subscription: '1 month',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'PayPal',
    price: '50',
    subscription: '7 days',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'PayPal',
    price: '50',
    subscription: '7 days',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'PayPal',
    price: '50',
    subscription: '7 days',
  },
  {
    dateOfPayment: '12.12.2022',
    endDate: '12.12.2022',
    paymentType: 'PayPal',
    price: '100',
    subscription: '1 month',
  },
]

export const Default: Story = {
  render: args => (
    <div className={s.wrapper}>
      <Table className={s.table} {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>Date of Payment</TableHead>
            <TableHead>End date of subscription</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Subscription Type</TableHead>
            <TableHead>Payment Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTableData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.dateOfPayment}</TableCell>
              <TableCell>{item.endDate}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.subscription}</TableCell>
              <TableCell>{item.paymentType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
}
