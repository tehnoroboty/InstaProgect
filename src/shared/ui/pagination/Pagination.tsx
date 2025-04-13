'use client'

import ArrowLeftIcon from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ArrowRightIcon from '@/src/shared/assets/componentsIcons/ArrowIosForwardOutline'
import { DOTS, usePagination } from '@/src/shared/ui/pagination/usePagination'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Button } from '../button/Button'
import { Typography } from '../typography/Typography'

type PaginationProps = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export type UsePaginationProps = Omit<PaginationProps, 'className' | 'onPageChange'>

export const Pagination = (props: PaginationProps) => {
  const {
    className,
    currentPage,
    onPageChange,
    onPageSizeChange,
    pageSize,
    siblingCount = 1,
    totalCount,
  } = props

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value)

    onPageSizeChange?.(newSize)
    onPageChange(1)
  }

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }
  const onNext = () => {
    onPageChange(currentPage + 1)
  }
  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <div className={clsx(s.container, className)}>
      <ul className={s.paginationContainer}>
        <li className={s.paginationItem}>
          <Button
            aria-label={'Previous page'}
            className={clsx(s.button, s.buttonArrow)}
            disabled={currentPage === 1}
            onClick={onPrevious}
            variant={'transparent'}
          >
            <ArrowLeftIcon className={s.arrowIcon} />
          </Button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li className={clsx(s.paginationItem, s.dots)} key={`dots-${index}`}>
                {DOTS}
              </li>
            )
          }

          return (
            <li className={s.paginationItem} key={pageNumber}>
              <Button
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                className={clsx(s.button, {
                  [s.selected]: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber as number)}
                variant={'transparent'}
              >
                {pageNumber}
              </Button>
            </li>
          )
        })}
        <li className={s.paginationItem}>
          <Button
            aria-label={'Next page'}
            className={clsx(s.button, s.buttonArrow)}
            disabled={currentPage === lastPage}
            onClick={onNext}
            variant={'transparent'}
          >
            <ArrowRightIcon className={s.arrowIcon} />
          </Button>
        </li>
      </ul>
      <div className={s.selectContainer}>
        <Typography>Show</Typography>
        <SelectBox
          className={s.select}
          isPagination
          onChangeValue={handlePageSizeChange}
          options={[
            { value: '10', valueTitle: '10' },
            { value: '20', valueTitle: '20' },
            { value: '30', valueTitle: '30' },
            { value: '50', valueTitle: '50' },
            { value: '100', valueTitle: '100' },
          ]}
        />
        <Typography>on page</Typography>
      </div>
    </div>
  )
}
