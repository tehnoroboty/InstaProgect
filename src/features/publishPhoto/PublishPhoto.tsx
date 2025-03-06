'use client'

import React from 'react'

import { FilteringPhoto } from '@/src/features/filteringPhoto/FilteringPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import Pin from '@/src/shared/assets/componentsIcons/PinOutline'
import { useBoolean } from '@/src/shared/hooks/useBoolean'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { Input } from '@/src/shared/ui/input'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'
import { Title } from '@radix-ui/react-dialog'

import s from './publishPhoto.module.scss'

type Props = {
  avatarOwner?: string
  photos: string[]
  userName?: string
}

export const PublishPhoto = ({ avatarOwner = '', photos, userName = 'User Name' }: Props) => {
  const openModal = useBoolean(true)
  const exitModal = useBoolean()
  const showFilteringPhoto = useBoolean()

  const handleBackClick = () => {
    openModal.setFalse()
    showFilteringPhoto.setTrue()
  }

  if (showFilteringPhoto.value) {
    return <FilteringPhoto photos={photos} />
  }

  return (
    <>
      <Dialog
        className={s.modal}
        isSimple
        onClose={() => {
          exitModal.setTrue()
        }}
        open={openModal.value}
      >
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
            {photos.length > 1 ? (
              <Carousel
                list={photos}
                renderItem={photo => <img alt={'photo'} className={s.photoImg} src={photo} />}
                size={'small'}
              />
            ) : (
              <img alt={'photo'} className={s.photoImg} src={photos[0]} />
            )}
          </div>
          <div className={s.descriptionBox}>
            <div className={s.publicationBox}>
              <UserAvatarName url={avatarOwner} username={userName} />
              <TextArea
                className={s.addPublication}
                label={'Add publication descriptions'}
                maxLength={500}
              />
            </div>
            <div className={s.locationBox}>
              <div className={s.inputContainer}>
                <Input className={s.addLocation} label={'Add location'} />
                <Pin className={s.pinIcon} />
              </div>

              <div className={s.selectedLocation}>
                <Typography className={s.city} option={'regular_text16'}>
                  {'New York'}
                </Typography>
                <Typography className={s.location} option={'small_text'}>
                  {'Washington Square Park'}
                </Typography>
              </div>
              <div className={s.selectedLocation}>
                <Typography className={s.city} option={'regular_text16'}>
                  {'New York'}
                </Typography>
                <Typography className={s.location} option={'small_text'}>
                  {'Washington Square Park'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <ExitModal
        onCloseModal={() => exitModal.setFalse()}
        onCloseParentModal={() => openModal.setFalse()}
        onSaveDraft={() => {}}
        open={exitModal.value}
      />
    </>
  )
}
