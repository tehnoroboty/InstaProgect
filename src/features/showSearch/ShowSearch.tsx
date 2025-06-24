'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

// import { setAppError } from '@/src/shared/model/slices/appSlice'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import debounce from 'lodash/debounce'

import s from './showSearch.module.scss'

const USERS_PER_PAGE = 6

const SHOW_USERS_PAGE_SIZE_OPTIONS = [6, 10, 20, 30, 50, 100].map(value => ({
  value: String(value),
  valueTitle: String(value),
}))

export const ShowSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  /*
    const [sortConfig, setSortConfig] = useState<{
      sortBy: SortColumn
      sortDirection: SortDirection
    }>({
      sortBy: 'createdAt',
      sortDirection: SortDirection.Desc,
    })
  */

  const dispatch = useDispatch()
  /*

    const variables: QueryGetPaymentsArgs = {
      pageNumber: currentPage,
      pageSize,
      searchTerm,
      ...sortConfig,
    }

    const { data, error, loading, refetch } = useGetPaymentsQuery({ variables })
  */

  /*
    const transformedData = useMemo(
      () => (data?.getPayments?.items ? paymentsDataTransform(data.getPayments.items) : []),
      [data]
    )
  */

  // const totalPagesCount = data?.getPayments?.totalCount || 0

  /*
    useEffect(() => {
      if (error) {
        const errorMessage = error.message

        dispatch(setAppError({ error: errorMessage }))
      }
    }, [error, dispatch])

  */
  // Добавляем debounce для поиска
  const handleSearchChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
      }, 500),
    []
  )

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      handleSearchChange.cancel()
    }
  }, [handleSearchChange])
  /*
useEffect(() => {

      const intervalId = setInterval(() => {
        void refetch()
      }, 10000)

    return () => clearInterval(intervalId)
  }, [autoUpdateEnabled, refetch])
  */
  const loading = true

  return (
    <div className={clsx(s.page)}>
      <div className={s.container}>
        <Typography option={'regular_text16'}>Text</Typography>
        <div className={s.header}>
          <Input
            className={s.searchInput}
            onInput={handleSearchChange}
            placeholder={'Search'}
            type={'search'}
          />
        </div>
        {loading ? (
          <div className={s.loading}>
            <Typography option={'regular_text16'}>Text</Typography>
          </div>
        ) : (
          <div>List of users</div>
        )}
      </div>
    </div>
  )
}
