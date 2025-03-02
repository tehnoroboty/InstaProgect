'use client'

import React from 'react'

import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Title } from '@radix-ui/react-dialog'

import s from './publishPhoto.module.scss'

export const PublishPhoto = () => {
  return (
    <Dialog className={s.modal} isSimple onClose={() => {}} open>
      <div className={s.header}>
        <Button className={s.buttonBack} onClick={() => {}} variant={'transparent'}>
          <ArrowIosBackOutline color={'white'} />
        </Button>
        <Title asChild>
          <Typography as={'h1'} option={'h1'}>
            {'Publication'}
          </Typography>
        </Title>
        <Button variant={'transparent'}>{'Publish'}</Button>
      </div>

      <div className={s.contentModal}>
        <div className={s.photoBox}></div>
        <div className={s.descriptionBox}></div>
      </div>
    </Dialog>
  )
}
