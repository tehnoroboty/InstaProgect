import { MouseEvent, ReactNode, useEffect, useRef } from 'react'

import clsx from 'clsx'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/scss'

import s from './carousel.module.scss'

import { Button } from '../button/Button'

type Props<T> = {
  disableSwipe?: boolean
  list: T[]
  onChange?: (index: number) => void
  renderItem: (item: T, index: number) => ReactNode
  size?: 'large' | 'small'
}

export const Carousel = <T,>(props: Props<T>) => {
  const { disableSwipe, list, onChange, renderItem, size = 'large' } = props
  const hasMoreThanOneItem = list.length > 1
  const classNames = clsx(s.carousel, s[size])
  const swiperRef = useRef<SwiperRef | null>(null)

  useEffect(() => {
    if (swiperRef.current) {
      if (disableSwipe) {
        swiperRef.current.swiper.disable()
      } else {
        swiperRef.current.swiper.enable()
      }
    }
  }, [disableSwipe])

  const handleStopPropagation = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) =>
    e.stopPropagation()

  return (
    <Swiper
      className={classNames}
      loop
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: `.${s.buttonNext}`,
        prevEl: `.${s.buttonPrev}`,
      }}
      onSlideChange={swiper => {
        if (onChange) {
          onChange(swiper.activeIndex)
        }
      }}
      pagination={{
        bulletActiveClass: `${s.paginationActive}`,
        clickable: true,
        el: `.${s.pagination}`,
      }}
      ref={swiperRef}
    >
      {list.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
      ))}
      {hasMoreThanOneItem && (
        <>
          <Button
            className={s.buttonPrev}
            onClick={handleStopPropagation}
            variant={'transparent'}
          ></Button>
          <Button
            className={s.buttonNext}
            onClick={handleStopPropagation}
            variant={'transparent'}
          ></Button>
          <div className={s.pagination} onClick={handleStopPropagation}></div>
        </>
      )}
    </Swiper>
  )
}
