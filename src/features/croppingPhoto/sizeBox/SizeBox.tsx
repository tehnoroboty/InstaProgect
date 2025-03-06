import React from 'react'

import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './sizeBox.module.scss'

export const SizeBox = ({ onAspectChange }: { onAspectChange: (ratio: number) => void }) => {
  return (
    <div className={s.items}>
      <div className={s.itemWrapper} onClick={() => onAspectChange(1)}>
        <Typography as={'span'} option={'h3'}>
          {'Оригинал'}
        </Typography>
        <ImageOutline className={s.img} />
      </div>
      <div className={s.itemWrapper} onClick={() => onAspectChange(1)}>
        <Typography as={'span'} option={'h3'}>
          {'1:1'}
        </Typography>
        <span
          className={s.imgItem}
          style={{
            height: '20px',
            width: '20px',
          }}
        ></span>
      </div>
      <div className={s.itemWrapper} onClick={() => onAspectChange(4 / 5)}>
        <Typography as={'span'} option={'h3'}>
          {'4:5'}
        </Typography>
        <span
          className={s.imgItem}
          style={{
            height: '26px',
            width: '20px',
          }}
        ></span>
      </div>
      <div className={s.itemWrapper} onClick={() => onAspectChange(16 / 9)}>
        <Typography as={'span'} option={'h3'}>
          {'16:9'}
        </Typography>
        <span className={s.imgItem} style={{ height: '20px', width: '26px' }}></span>
      </div>
    </div>
  )
}
