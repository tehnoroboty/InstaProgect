'use client'

import React from 'react'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Title } from '@radix-ui/react-dialog'

import s from '@/src/features/croppingPhoto/croppingPhoto.module.scss'

type Props = {
  photo: string
}
export const FilteringPhoto = ({ photo }: Props) => {
  return (
    <Dialog className={s.modal} isSimple onClose={() => {}} open>
      <div className={s.header}>
        <Button className={s.buttonBack} onClick={() => {}} variant={'transparent'}>
          <ArrowIosBackOutline color={'white'} />
        </Button>
        <Title asChild>
          <Typography as={'h1'} option={'h1'}>
            {'Filters'}
          </Typography>
        </Title>
        <Button variant={'transparent'}>{'Next'}</Button>
      </div>

      <div className={s.contentModal}>
        <img alt={'photo'} src={photo} />
      </div>
    </Dialog>
  )
}
