import { ReactNode } from 'react'

import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/scss'

import s from './carousel.module.scss'

import { Button } from '../button/Button'

type Props<T> = {
  list: T[]
  renderItem: (item: T) => ReactNode
}

export const Carousel = <T,>(props: Props<T>) => {
  const { list, renderItem } = props

  return (
    <Swiper
      className={s.carousel}
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
    >
      {list.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
      ))}
      <Button className={s.buttonPrev} variant={'transparent'}></Button>
      <Button className={s.buttonNext} variant={'transparent'}></Button>

      <div className={s.pagination}></div>
    </Swiper>
  )
}
