import { ReactNode, useEffect, useRef } from 'react'

import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/scss'

import s from './carousel.module.scss'

import { Button } from '../button/Button'

type CarouselItem = { url: StaticImageData | string }

type Props<T extends CarouselItem> = {
  disableSwipe?: boolean
  list: T[]
  onChange?: (index: number) => void
  renderItem?: (item: T, index: string) => ReactNode
  size?: 'large' | 'small'
}

export const Carousel = <T extends CarouselItem>(props: Props<T>) => {
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
      {list.map((item: T, index: number) => {
        const src = typeof item.url === 'string' ? item.url : item.url.src

        return (
          <SwiperSlide className={s.slide} key={index}>
            {renderItem ? (
              renderItem(item, index.toString())
            ) : (
              <>
                <Image alt={'image'} height={100} src={src} width={100} />
              </>
            )}
          </SwiperSlide>
        )
      })}
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
