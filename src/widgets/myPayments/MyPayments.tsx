import { useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/src/shared/lib/constants/pagination'
import { useMyPaymentsQuery } from '@/src/shared/model/api/subscriptionsApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { Pagination } from '@/src/shared/ui/pagination/Pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table'
import { mockTableData } from '@/src/shared/ui/table/mockData'
import { transformData } from '@/src/widgets/myPayments/lib/transformData'

import s from './myPayments.module.scss'

export const MyPayments = () => {
  const { data, isLoading } = useMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }
  const tableData = data ? transformData(data) : transformData(mockTableData)

  const paginatedData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className={s.page}>
      <Table className={s.table}>
        <TableHeader>
          <TableRow>
            <TableHead>{'Date of Payment'}</TableHead>
            <TableHead>{'End date of subscription'}</TableHead>
            <TableHead>{'Price'}</TableHead>
            <TableHead>{'Subscription Type'}</TableHead>
            <TableHead>{'Payment Type'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
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
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        totalCount={tableData.length}
      />
    </div>
  )
}
