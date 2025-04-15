'use client'

import ArrowLeftIcon from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ArrowRightIcon from '@/src/shared/assets/componentsIcons/ArrowIosForwardOutline'
import { PAGE_SIZE_OPTIONS } from '@/src/shared/lib/constants/pagination'
import { DOTS, usePagination } from '@/src/shared/ui/pagination/usePagination'
import { SelectBox } from '@/src/shared/ui/select/SelectBox'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Button } from '../button/Button'
import { Typography } from '../typography/Typography'

type PaginationProps = {
  className?: string
  /**
   * represents the current active page
   * */
  currentPage: number
  /**
   * callback function invoked with the updated page value when the page is changed
   * */
  onPageChange: (page: number) => void
  /**
   * callback function is called when the value changes*/
  onPageSizeChange: (size: number) => void
  /**
   * represents the maximum data that is visible in a single page
   * */
  pageSize: number
  /**
   * represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.*/
  siblingCount?: number
  /**
   * represents the total count of data available from the source
   * */
  totalCount: number
}

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

    if (isNaN(newSize)) {
      return
    }

    onPageSizeChange(newSize)
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
      <nav aria-label={'Pagination'}>
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
      </nav>
      <div className={s.selectContainer}>
        <Typography>Show</Typography>
        <SelectBox
          className={s.select}
          isPagination
          onChangeValue={handlePageSizeChange}
          options={PAGE_SIZE_OPTIONS}
        />
        <Typography>on page</Typography>
      </div>
    </div>
  )
}
