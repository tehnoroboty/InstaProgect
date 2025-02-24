'use client'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ExpandOutline from '@/src/shared/assets/componentsIcons/ExpandOutline'
import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import MaximizeOutline from '@/src/shared/assets/componentsIcons/MaximizeOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { SliderComponent } from '@/src/shared/ui/slider/Slider'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Title } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './croppingPhoto.module.scss'

type Props = {
  photo: any
}
export const CroppingPhoto = ({ photo }: Props) => {
  const [aspect, setAspect] = useState<number>(1)
  const [editor, setEditor] = useState(null)
  const router = useRouter()
  const onClickBack = () => {
    router.back()
  }

  return (
    <Dialog className={s.modal} isSimple onClose={() => {}} open>
      <div className={s.header}>
        <Button className={s.buttonBack} onClick={onClickBack} variant={'transparent'}>
          <ArrowIosBackOutline color={'white'} />
        </Button>
        <Title asChild>
          <Typography as={'h1'} option={'h1'}>
            {'Cropping'}
          </Typography>
        </Title>
        <Button as={Link} href={''} variant={'transparent'}>
          {'Next'}
        </Button>
      </div>
      <div style={{ height: '503px', position: 'relative', width: '490px' }}>
        <Cropper
          aspect={1}
          classes={{
            containerClassName: s.container,
            cropAreaClassName: s.cropArea,
            mediaClassName: s.media,
          }}
          crop={{ x: 0, y: 0 }}
          image={photo}
          onCropChange={() => {}}
          showGrid={false}
        />
        <div className={s.navigations}>
          <div className={s.btnSize}>
            <div>
              <Button className={s.btn} variant={'secondary'}>
                <ExpandOutline />
              </Button>
            </div>
            <div>
              <Button className={s.btn} variant={'secondary'}>
                <MaximizeOutline />
              </Button>
            </div>
          </div>
          <Button className={s.btn} variant={'secondary'}>
            <ImageOutline />
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
