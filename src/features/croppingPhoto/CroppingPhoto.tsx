'use client'
import React, { useRef, useState } from 'react'
import Cropper from 'react-easy-crop'

import { PhotoPreview } from '@/src/features/croppingPhoto/photoPreview/PhotoPreview'
import { SizeBox } from '@/src/features/croppingPhoto/sizeBox/SizeBox'
import { FilteringPhoto } from '@/src/features/filteringPhoto/FilteringPhoto'
import ArrowIosBackOutline from '@/src/shared/assets/componentsIcons/ArrowIosBackOutline'
import ExpandOutline from '@/src/shared/assets/componentsIcons/ExpandOutline'
import Image from '@/src/shared/assets/componentsIcons/Image'
import ImageOutline from '@/src/shared/assets/componentsIcons/ImageOutline'
import Maximize from '@/src/shared/assets/componentsIcons/Maximize'
import MaximizeOutline from '@/src/shared/assets/componentsIcons/MaximizeOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Arousel } from '@/src/shared/ui/carousel/Carousel'
import { Dialog } from '@/src/shared/ui/dialog'
import { PopoverComponent } from '@/src/shared/ui/popover/Popover'
import { SliderComponent } from '@/src/shared/ui/slider/Slider'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { AddPost } from '@/src/widgets/addPost/AddPost'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'
import { Title } from '@radix-ui/react-dialog'

import s from './croppingPhoto.module.scss'

type Props = {
  photos: string[]
  selectedPhoto: string
}
export const CroppingPhoto = ({ photos, selectedPhoto }: Props) => {
  const [openModal, setOpenModel] = useState<boolean>(true)
  const [exitModal, setExitModal] = useState<boolean>(false)
  const [showFilteringPhoto, setShowFilteringPhoto] = useState<boolean>(false)
  const [showAddPost, setShowAddPost] = useState<boolean>(false)

  const [size, setSize] = useState<number>(1)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<{
    height: number
    width: number
    x: number
    y: number
  } | null>(null)

  const [localPhotos, setLocalPhotos] = useState<string[]>(photos)
  const [localSelectedPhoto, setLocalSelectedPhoto] = useState<string>(selectedPhoto)

  const closeModal = () => setOpenModel(false)

  const handleNextClick = () => {
    closeModal()
    setShowFilteringPhoto(true)
  }

  const handleBackClick = () => {
    closeModal()
    setShowAddPost(true)
  }

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

  const handlePhotoSelect = (selected: string) => {
    setLocalSelectedPhoto(selected)
  }

  const handlePhotoUpload = (newPhoto: string) => {
    setLocalPhotos([...localPhotos, newPhoto])
    setLocalSelectedPhoto(newPhoto)
  }

  const handlePhotoDelete = (index: number) => {
    const updatedPhotos = localPhotos.filter((_, i) => i !== index)

    setLocalPhotos(updatedPhotos)
    if (localSelectedPhoto === localPhotos[index]) {
      setLocalSelectedPhoto(updatedPhotos[0] || '')
    }
  }

  if (showFilteringPhoto) {
    return <FilteringPhoto photos={localPhotos} />
  }

  if (showAddPost) {
    return <AddPost />
  }

  return (
    <>
      <Dialog
        className={s.modal}
        isSimple
        onClose={() => {
          setExitModal(true)
        }}
        open={openModal}
      >
        <div className={s.header}>
          <Button className={s.buttonBack} onClick={handleBackClick} variant={'transparent'}>
            <ArrowIosBackOutline color={'white'} />
          </Button>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {'Cropping'}
            </Typography>
          </Title>
          <Button onClick={handleNextClick} variant={'transparent'}>
            {'Next'}
          </Button>
        </div>
        <div className={s.contentModal}>
          {localPhotos.length > 1 ? (
            <Arousel
              list={localPhotos}
              renderItem={(item: string) => {
                return (
                  <Cropper
                    aspect={size}
                    classes={{
                      containerClassName: s.container,
                      cropAreaClassName: s.cropArea,
                      mediaClassName: s.media,
                    }}
                    crop={crop}
                    image={item}
                    maxZoom={10}
                    minZoom={1}
                    objectFit={'cover'}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    showGrid={false}
                    zoom={zoomLevel}
                  />
                )
              }}
            />
          ) : (
            <Cropper
              aspect={size}
              classes={{
                containerClassName: s.container,
                cropAreaClassName: s.cropArea,
                mediaClassName: s.media,
              }}
              crop={crop}
              image={localSelectedPhoto}
              maxZoom={10}
              minZoom={1}
              objectFit={'cover'}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              showGrid={false}
              zoom={zoomLevel}
            />
          )}
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
                <SliderComponent setVolume={onChangeVolume} zoom={zoomLevel} />
              </PopoverComponent>
            </div>
            <PopoverComponent
              align={'end'}
              icon={<ImageOutline />}
              iconActive={<Image className={s.active} />}
            >
              <PhotoPreview
                onDelete={handlePhotoDelete}
                onSelect={handlePhotoSelect}
                onUpload={handlePhotoUpload}
                photos={localPhotos}
              />
            </PopoverComponent>
          </div>
        </div>
      </Dialog>
      <ExitModal
        onCloseModal={() => setExitModal(false)}
        onCloseParentModal={closeModal}
        onSaveDraft={() => {}}
        open={exitModal}
      />
    </>
  )
}
