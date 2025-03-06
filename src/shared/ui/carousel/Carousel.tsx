import { ReactNode, useEffect, useRef } from 'react'

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
  renderItem: (item: T) => ReactNode
  size: 'large' | 'small'
}

export const Carousel = <T,>(props: Props<T>) => {
  const { disableSwipe, list, renderItem, size } = props
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

  return (
    <Swiper
      className={classNames}
      loop
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: `.${s.buttonNext}`,
        prevEl: `.${s.buttonPrev}`,
      }}
      pagination={{
        bulletActiveClass: `${s.paginationActive}`,
        clickable: true,
        el: `.${s.pagination}`,
      }}
      ref={swiperRef}
    >
      {list.map((item, index) => (
        <SwiperSlide className={s.slide} key={index}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
      {hasMoreThanOneItem && (
        <>
          <Button className={s.buttonPrev} variant={'transparent'}></Button>
          <Button className={s.buttonNext} variant={'transparent'}></Button>
          <div className={s.pagination}></div>
        </>
      )}
    </Swiper>
  )
}
