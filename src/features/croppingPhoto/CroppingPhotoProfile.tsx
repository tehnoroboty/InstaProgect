'use client'
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch } from 'react-redux'

import { PhotoSettings } from '@/src/features/croppingPhoto/types'
import { useBoolean } from '@/src/shared/hooks/useBoolean'
import { setIsPhotoModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'

import s from './croppingPhoto.module.scss'

type Props = {
  onSave: (croppedPhoto: string) => void
  photo: string
}
export const CroppingPhotoProfile = ({ onSave, photo }: Props) => {
  const [openModal, setOpenModel] = useState<boolean>(true)
  const dispatch = useDispatch()
  const exitModal = useBoolean()

  const closeStateModal = () => {
    dispatch(setIsPhotoModalOpen({ isOpen: false }))
  }

  const [photoSettings, setPhotoSettings] = useState<PhotoSettings>({
    crop: { x: 0, y: 0 },
    croppedAreaPixels: null,
    size: 1,
    zoomLevel: 1,
  })

  const updatePhotoSettings = (updates: Partial<PhotoSettings>) => {
    setPhotoSettings(prev => ({ ...prev, ...updates }))
  }

  return (
    <>
      <Dialog
        className={s.modal}
        modalTitle={'Add a Profile Photo'}
        onClose={closeStateModal}
        open={openModal}
      >
        <div className={s.content}>
          <Cropper
            aspect={photoSettings.size}
            classes={{
              containerClassName: s.container,
              cropAreaClassName: s.cropArea,
              mediaClassName: s.media,
            }}
            crop={photoSettings.crop}
            image={photo}
            maxZoom={2}
            minZoom={0.8}
            objectFit={'cover'}
            onCropChange={newCrop => updatePhotoSettings({ crop: newCrop })}
            onCropComplete={(_, croppedAreaPixels) => updatePhotoSettings({ croppedAreaPixels })}
            showGrid={false}
            zoom={photoSettings.zoomLevel}
          />
        </div>
        <Button className={s.saveBth} onClick={handleNextClick} variant={'transparent'}>
          {'Save'}
        </Button>
      </Dialog>
      <ExitModal
        onCloseModal={() => exitModal.setFalse()}
        onCloseParentModal={() => dispatch(setIsPhotoModalOpen({ isOpen: false }))}
        onSaveDraft={() => {}}
        open={exitModal.value}
      />
    </>
  )
}
