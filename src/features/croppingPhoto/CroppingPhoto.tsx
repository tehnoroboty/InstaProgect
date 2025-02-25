'use client'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ExpandOutline from '@/src/shared/assets/componentsIcons/ExpandOutline'
import Image from '@/src/shared/assets/componentsIcons/Image'
import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import Maximize from '@/src/shared/assets/componentsIcons/Maximize'
import MaximizeOutline from '@/src/shared/assets/componentsIcons/MaximizeOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { PopoverComponent } from '@/src/shared/ui/popover/Popover'
import { SliderComponent } from '@/src/shared/ui/slider/Slider'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Title } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './croppingPhoto.module.scss'

type Props = {
  photo: string
}
export const CroppingPhoto = ({ photo }: Props) => {
  const [size, setSize] = useState<number>(1)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<{
    height: number
    width: number
    x: number
    y: number
  } | null>(null)

  const handleAspectChange = (ratio: number) => {
    setSize(ratio)
  }
  const onChangeVolume = (volume: number) => {
    setZoomLevel(volume)
  }
  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onCropComplete = (croppedArea: any) => {
    setCroppedArea(croppedArea)
  }

  return (
    <Dialog className={s.modal} isSimple onClose={() => {}} open>
      <div className={s.header}>
        <Button className={s.buttonBack} onClick={() => {}} variant={'transparent'}>
          <ArrowIosBackOutline color={'white'} />
        </Button>
        <Title asChild>
          <Typography as={'h1'} option={'h1'}>
            {'Cropping'}
          </Typography>
        </Title>
        <Button variant={'transparent'}>{'Next'}</Button>
      </div>
      <div className={s.contentModal}>
        <Cropper
          aspect={size}
          classes={{
            containerClassName: s.container,
            cropAreaClassName: s.cropArea,
            mediaClassName: s.media,
          }}
          crop={crop}
          image={photo}
          maxZoom={10}
          minZoom={1}
          objectFit={'cover'}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          showGrid={false}
          zoom={zoomLevel}
        />
        <div className={s.navigations}>
          <div className={s.btnSize}>
            <PopoverComponent
              align={'start'}
              icon={<ExpandOutline />}
              iconActive={<ExpandOutline className={s.active} />}
            >
              <SizeBox onAspectChange={handleAspectChange} />
            </PopoverComponent>
            <PopoverComponent
              align={'start'}
              icon={<MaximizeOutline />}
              iconActive={<Maximize className={s.active} />}
            >
              <SliderComponent setVolume={onChangeVolume} />
            </PopoverComponent>
          </div>
          <PopoverComponent
            align={'end'}
            icon={<ImageOutline />}
            iconActive={<Image className={s.active} />}
          >
            <AddPhotoBox />
          </PopoverComponent>
        </div>
      </div>
    </Dialog>
  )
}

const SizeBox = ({ onAspectChange }: { onAspectChange: (ratio: number) => void }) => {
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
