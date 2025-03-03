'use client'

import React, { useState } from 'react'

import { FilteringPhoto } from '@/src/features/filteringPhoto/FilteringPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Arousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Title } from '@radix-ui/react-dialog'

import s from './publishPhoto.module.scss'

type Props = {
  photos: string[]
}

export const PublishPhoto = ({ photos }: Props) => {
  const [openModal, setOpenModel] = useState<boolean>(true)
  const [showFilteringPhoto, setShowFilteringPhoto] = useState<boolean>(false)
  const closeModal = () => setOpenModel(false)

  const handleBackClick = () => {
    closeModal()
    setShowFilteringPhoto(true)
  }

  if (showFilteringPhoto) {
    return <FilteringPhoto photos={[]} />
  }
  console.log(photos)

  return (
    <Dialog className={s.modal} isSimple onClose={() => {}} open={openModal}>
      <div className={s.header}>
        <Button className={s.buttonBack} onClick={handleBackClick} variant={'transparent'}>
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
        <div className={s.photoBox}>
          <Arousel
            list={photos}
            renderItem={photo => <img alt={'photo'} className={s.photoImg} src={photo} />}
          />
        </div>
        <div className={s.descriptionBox}></div>
      </div>
    </Dialog>
  )
}
