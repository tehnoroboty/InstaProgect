import React from 'react'

import {
  MyPaymentType,
  SelectedSubscriptionType,
  SystemPaymentType,
} from '@/src/entities/subscription/types'
import { parseISOAndFormat } from '@/src/shared/hooks/parseIsoAndFormat'
import { useMyPaymentsQuery } from '@/src/shared/model/api/subscriptionsApi'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table'
import { mockTableData } from '@/src/shared/ui/table/mockData'

import s from './myPayments.module.scss'

export type TableData = {
  dateOfPayment: string
  endDate: string
  paymentType: string
  price: string
  subscription: string
}

export const formatPaymentType = (type: SystemPaymentType): string => {
  switch (type) {
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'PAYPAL':
      return 'PayPal'
    case 'STRIPE':
      return 'Stripe'
    default:
      return type
  }
}

export const formatSubscriptionType = (type: SelectedSubscriptionType): string => {
  switch (type) {
    case 'DAY':
      return '1 day'
    case 'WEEKLY':
      return '7 days'
    case 'MONTHLY':
      return '1 month'
    default:
      return type
  }
}

export const transformData = (serverData: MyPaymentType[]): TableData[] => {
  return serverData.map(item => ({
    dateOfPayment: parseISOAndFormat(item.dateOfPayment),
    endDate: parseISOAndFormat(item.endDateOfSubscription),
    paymentType: formatPaymentType(item.paymentType),
    price: item.price.toString(),
    subscription: formatSubscriptionType(item.subscriptionType),
  }))
}

export const MyPayments = () => {
  const { data, isLoading } = useMyPaymentsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }
  /*  if (!data) {
    return <div>No data</div>
  }*/
  const tableData = data ? transformData(data) : transformData(mockTableData)

  return (
    <div className={s.page}>
      <Table className={s.table}>
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
          {tableData.map((item, index) => (
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
  )
}
