import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'

import s from './carousel.module.scss'

import img from './assets/slider.jpg'

type Props = {}

export const Carousel = (props: Props) => {
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
      <SwiperSlide className={s.slide}>
        <ImageView />
      </SwiperSlide>
      <SwiperSlide className={s.slide}>
        <ImageView />
      </SwiperSlide>
      <SwiperSlide className={s.slide}>
        <ImageView />
      </SwiperSlide>

      <div className={s.buttonPrev}></div>
      <div className={s.buttonNext}></div>

      {/* Пагинация */}
      <div className={s.pagination}></div>
    </Swiper>
  )
}

const ImageView = (props: Props) => {
  return <Image alt={'First image'} height={503} src={img} width={490} />
}
