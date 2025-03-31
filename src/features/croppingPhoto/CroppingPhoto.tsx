'use client'
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch } from 'react-redux'

import { applyCropToAllPhotos } from '@/src/features/croppingPhoto/applyCropToAllPhotos'
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
import { useBoolean } from '@/src/shared/hooks/useBoolean'
import { setIsModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Button } from '@/src/shared/ui/button/Button'
import { Carousel } from '@/src/shared/ui/carousel/Carousel'
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
  const openModal = useBoolean(true)
  const dispatch = useDispatch()
  const exitModal = useBoolean()
  const showFilteringPhoto = useBoolean()
  const showAddPost = useBoolean()

  const [localPhotos, setLocalPhotos] = useState<string[]>(photos)
  const [localSelectedPhoto, setLocalSelectedPhoto] = useState<string>(photos[0])
  const [photoSettings, setPhotoSettings] = useState(
    photos.reduce(
      (acc, _, index) => {
        acc[index] = {
          crop: { x: 0, y: 0 },
          croppedAreaPixels: null,
          size: 1,
          zoomLevel: 1,
        }

        return acc
      },
      {} as Record<number, PhotoSettings>
    )
  )
  const selectedPhotoIndex = localPhotos.indexOf(localSelectedPhoto)
  const currentPhotoSettings = photoSettings[selectedPhotoIndex]

  const handleNextClick = async () => {
    await applyCropToAllPhotos(localPhotos, photoSettings, setLocalPhotos)
    openModal.setFalse()
    showFilteringPhoto.setTrue()
  }

  const handleBackClick = () => {
    openModal.setFalse()
    showAddPost.setTrue()
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

  if (showFilteringPhoto.value) {
    return <FilteringPhoto photos={localPhotos} />
  }

  if (showAddPost.value) {
    return <AddPost />
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
              {'Cropping'}
            </Typography>
          </Title>
          <Button onClick={handleNextClick} variant={'transparent'}>
            {'Next'}
          </Button>
        </div>
        <div className={s.contentModal}>
          {localPhotos.length > 1 ? (
            <Carousel
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
                    maxZoom={2}
                    minZoom={0.8}
                    objectFit={'cover'}
                    onCropChange={newCrop => updatePhotoSettings(index, { crop: newCrop })}
                    onCropComplete={(_, croppedAreaPixels) =>
                      updatePhotoSettings(index, { croppedAreaPixels })
                    }
                    showGrid={false}
                    zoom={zoomLevel}
                  />
                )
              }}
              size={'small'}
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
              maxZoom={2}
              minZoom={0.8}
              objectFit={'cover'}
              onCropChange={newCrop => updatePhotoSettings(0, { crop: newCrop })}
              onCropComplete={(_, croppedAreaPixels) =>
                updatePhotoSettings(0, { croppedAreaPixels })
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
                <SizeBox
                  onAspectChange={ratio => updatePhotoSettings(selectedPhotoIndex, { size: ratio })}
                />
              </PopoverComponent>
              <PopoverComponent
                align={'start'}
                icon={<MaximizeOutline />}
                iconActive={<Maximize className={s.active} />}
              >
                <SliderComponent
                  setVolume={volume =>
                    updatePhotoSettings(selectedPhotoIndex, { zoomLevel: volume })
                  }
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
                onSelect={(selected: string) => setLocalSelectedPhoto(selected)}
                onUpload={handlePhotoUpload}
                photos={localPhotos}
              />
            </PopoverComponent>
          </div>
        </div>
      </Dialog>
      <ExitModal
        onCloseModal={() => exitModal.setFalse()}
        onCloseParentModal={() => dispatch(setIsModalOpen({ isOpen: false }))}
        onSaveDraft={() => {}}
        open={exitModal.value}
      />
    </>
  )
}
