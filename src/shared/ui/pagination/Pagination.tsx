'use client'

import ArrowLeftIcon from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ArrowRightIcon from '@/src/shared/assets/componentsIcons/ArrowIosForwardOutline'
import { DOTS, usePagination } from '@/src/shared/ui/pagination/usePagination'
import { Options, SelectBox } from '@/src/shared/ui/select/SelectBox'
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
  onPageSizeChange?: (size: number) => void
  /**
   * represents the maximum data that is visible in a single page
   * */
  pageSize: number
  /**
   * custom select options*/
  pageSizeOptions?: Options[]
  /**
   * represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.*/
  siblingCount?: number
  /**
   * represents the total count of data available from the source
   * */
  totalCount: number
}

export type UsePaginationProps = Omit<PaginationProps, 'className' | 'onPageChange'>

const PAGE_SIZE_OPTIONS: Options[] = [
  { value: '10', valueTitle: '10' },
  { value: '20', valueTitle: '20' },
  { value: '30', valueTitle: '30' },
  { value: '50', valueTitle: '50' },
  { value: '100', valueTitle: '100' },
]

export const Pagination = (props: PaginationProps) => {
  const {
    className,
    currentPage,
    onPageChange,
    onPageSizeChange,
    pageSize,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    siblingCount = 1,
    totalCount,
  } = props

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value)

    if (isNaN(newSize)) {
      return
    }

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
          options={pageSizeOptions}
        />
        <Typography>on page</Typography>
      </div>
    </div>
  )
}
