'use client'

import ArrowLeftIcon from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ArrowRightIcon from '@/src/shared/assets/componentsIcons/ArrowIosForwardOutline'
import { DOTS, usePagination } from '@/src/shared/ui/pagination/usePagination'
import clsx from 'clsx'

import s from './pagination.module.scss'

type PaginationProps = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export type UsePaginationProps = Omit<PaginationProps, 'className' | 'onPageChange'>

export const Pagination = (props: PaginationProps) => {
  const { className, currentPage, onPageChange, pageSize, siblingCount = 1, totalCount } = props

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
    <ul className={clsx(s.paginationContainer, className)}>
      <li
        className={clsx(s.paginationItem, s.paginationItemArrow, {
          [s.disabled]: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <ArrowLeftIcon className={s.arrowIcon} />
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
          <li
            className={clsx(s.paginationItem, {
              [s.selected]: pageNumber === currentPage,
            })}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={clsx(s.paginationItem, s.paginationItemArrow, {
          [s.disabled]: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <ArrowRightIcon className={s.arrowIcon} />
      </li>
    </ul>
  )
}
