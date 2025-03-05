'use client'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

import { getCroppedImage } from '@/scripts/getCroppedImage'
import { PhotoPreview } from '@/src/features/croppingPhoto/photoPreview/PhotoPreview'
import { SizeBox } from '@/src/features/croppingPhoto/sizeBox/SizeBox'
import { PhotoSettings } from '@/src/features/croppingPhoto/types'
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
}
export const CroppingPhoto = ({ photos }: Props) => {
  const [openModal, setOpenModel] = useState<boolean>(true)
  const [exitModal, setExitModal] = useState<boolean>(false)
  const [showFilteringPhoto, setShowFilteringPhoto] = useState<boolean>(false)
  const [showAddPost, setShowAddPost] = useState<boolean>(false)
  const [localPhotos, setLocalPhotos] = useState<string[]>(photos)
  const [localSelectedPhoto, setLocalSelectedPhoto] = useState<string>(photos[0])
  const [photoSettings, setPhotoSettings] = useState(
    photos.reduce(
      (acc, photo, index) => {
        acc[index] = {
          crop: { x: 0, y: 0 },
          croppedAreaPixels: null,
          size: 1,
          zoomLevel: 1,
        }

        return acc
      },
      {} as Record<
        number,
        {
          crop: { x: number; y: number }
          croppedAreaPixels: any
          size: number
          zoomLevel: number
        }
      >
    )
  )
  const selectedPhotoIndex = localPhotos.indexOf(localSelectedPhoto)
  const currentPhotoSettings = photoSettings[selectedPhotoIndex]
  //TODO: useBoolean()
  const closeModal = () => setOpenModel(false)

  const applyCropToAllPhotos = async () => {
    const updatedPhotos = await Promise.all(
      localPhotos.map(async (photo, index) => {
        const { croppedAreaPixels } = photoSettings[index]

        if (croppedAreaPixels) {
          return await getCroppedImage(photo, croppedAreaPixels)
        }

        return photo
      })
    )

    setLocalPhotos(updatedPhotos)
  }

  const handleNextClick = () => {
    applyCropToAllPhotos()
    closeModal()
    setShowFilteringPhoto(true)
  }

  const handleBackClick = () => {
    closeModal()
    setShowAddPost(true)
  }

  const updatePhotoSettings = (index: number, updates: Partial<PhotoSettings>) => {
    setPhotoSettings(prevSettings => ({
      ...prevSettings,
      [index]: {
        ...prevSettings[index],
        ...updates,
      },
    }))
  }

  const handleAspectChange = (index: number, ratio: number) => {
    updatePhotoSettings(index, { size: ratio })
  }
  const onChangeVolume = (index: number, volume: number) => {
    updatePhotoSettings(index, { zoomLevel: volume })
  }
  const onCropChange = (index: number, crop: { x: number; y: number }) => {
    updatePhotoSettings(index, { crop })
  }
  // const onCropComplete = (index: number, croppedArea: any, croppedAreaPixels: any) => {
  //   updatePhotoSettings(index, { croppedAreaPixels })
  // }

  const handlePhotoSelect = (selected: string) => {
    setLocalSelectedPhoto(selected) //TODO: setLocalSelectedPhoto напрямую
  }

  const handlePhotoUpload = (newPhoto: string) => {
    const newIndex = localPhotos.length

    setLocalPhotos([...localPhotos, newPhoto])
    setPhotoSettings(prevSettings => ({
      ...prevSettings,
      [newIndex]: {
        ...prevSettings[newIndex],
        crop: { x: 0, y: 0 },
        croppedAreaPixels: null,
        size: 1,
        zoomLevel: 1,
      },
    }))
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
              onChange={index => {
                setLocalSelectedPhoto(localPhotos[index])
              }}
              renderItem={(item, index) => {
                const { crop, size, zoomLevel } = photoSettings[index]

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
                    onCropChange={newCrop => onCropChange(index, newCrop)}
                    onCropComplete={(_, croppedAreaPixels) =>
                      updatePhotoSettings(index, { croppedAreaPixels })
                    }
                    showGrid={false}
                    zoom={zoomLevel}
                  />
                )
              }}
            />
          ) : (
            <Cropper
              aspect={currentPhotoSettings?.size || 1}
              classes={{
                containerClassName: s.container,
                cropAreaClassName: s.cropArea,
                mediaClassName: s.media,
              }}
              crop={currentPhotoSettings?.crop || { x: 0, y: 0 }}
              image={localSelectedPhoto}
              maxZoom={10}
              minZoom={1}
              objectFit={'cover'}
              onCropChange={newCrop => onCropChange(0, newCrop)}
              onCropComplete={(cropArea, croppedAreaPixels) =>
                onCropComplete(0, cropArea, croppedAreaPixels)
              }
              showGrid={false}
              zoom={currentPhotoSettings?.zoomLevel || 1}
            />
          )}
          <div className={s.navigations}>
            <div className={s.btnSize}>
              <PopoverComponent
                align={'start'}
                icon={<ExpandOutline />}
                iconActive={<ExpandOutline className={s.active} />}
              >
                <SizeBox onAspectChange={ratio => handleAspectChange(selectedPhotoIndex, ratio)} />
              </PopoverComponent>
              <PopoverComponent
                align={'start'}
                icon={<MaximizeOutline />}
                iconActive={<Maximize className={s.active} />}
              >
                <SliderComponent
                  setVolume={volume => onChangeVolume(selectedPhotoIndex, volume)}
                  zoom={photoSettings[selectedPhotoIndex]?.zoomLevel}
                />
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
