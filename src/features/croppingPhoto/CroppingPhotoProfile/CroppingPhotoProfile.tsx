'use client'
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useDispatch } from 'react-redux'

import { applyCropToAllPhotos } from '@/src/features/croppingPhoto/applyCropToAllPhotos'
import { PhotoSettings } from '@/src/features/croppingPhoto/types'
import { CustomerError } from '@/src/shared/model/api/types'
import { useUpdateUserAvatarMutation } from '@/src/shared/model/api/usersApi'
import { setIsPhotoModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { ExitModal } from '@/src/widgets/exitModal/ExitModal'

import s from './сroppingPhotoProfile.module.scss'

type Props = {
  photos: string[]
}
export const CroppingPhotoProfile = ({ photos }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(true)
  const [exitModal, setExitModal] = useState(false)

  const localPhoto = photos[0] ?? ''

  const [photoSettings, setPhotoSettings] = useState<PhotoSettings>({
    crop: { x: 0, y: 0 },
    croppedAreaPixels: null,
    size: 1,
    zoomLevel: 1,
  })

  const [updateAvatar, { isError, isLoading }] = useUpdateUserAvatarMutation()

  const closeStateModal = () => {
    dispatch(setIsPhotoModalOpen({ isOpen: false }))
    setOpenModal(false)
  }

  const onSaveClick = async () => {
    try {
      await applyCropToAllPhotos([localPhoto], { 0: photoSettings }, async updatedPhotos => {
        // setLocalPhoto(updatedPhotos[0])

        const blob = await fetch(updatedPhotos[0]).then(res => res.blob())
        const file = new File([blob], 'avatar.jpg', { type: blob.type })

        await updateAvatar({ file }).unwrap()

        setOpenModal(false)
        dispatch(setIsPhotoModalOpen({ isOpen: false }))
      })
    } catch (error) {
      const err = error as CustomerError
      const errorMessage = err.data?.messages[0]

      setErrorMessage(errorMessage?.message)
    }
  }

  const updatePhotoSettings = (updates: Partial<PhotoSettings>) => {
    setPhotoSettings(prev => ({
      ...prev,
      ...updates,
    }))
  }

  return (
    <>
      {isError && <Alerts message={errorMessage} position={'fixed'} type={'error'} />}
      {isLoading && (
        <div className={s.loading}>
          <Loader />
        </div>
      )}
      <Dialog
        className={s.modal}
        modalTitle={'Add a Profile Photo'}
        onClose={() => {
          setExitModal(true)
        }}
        open={openModal}
      >
        <div className={s.contentBox}>
          <div className={s.contentModal}>
            <Cropper
              aspect={photoSettings.size}
              classes={{
                containerClassName: s.container,
                cropAreaClassName: s.cropArea,
                mediaClassName: s.media,
              }}
              crop={photoSettings.crop}
              image={localPhoto}
              objectFit={'cover'}
              onCropChange={crop => updatePhotoSettings({ crop })}
              onCropComplete={(_, croppedAreaPixels) => updatePhotoSettings({ croppedAreaPixels })}
              showGrid={false}
              zoom={photoSettings.zoomLevel}
            />
          </div>
        </div>
        <Button className={s.saveBth} onClick={onSaveClick} variant={'primary'}>
          {'Save'}
        </Button>
      </Dialog>
      <ExitModal
        modalType={'photo'}
        onCloseModal={() => setExitModal(false)}
        onCloseParentModal={closeStateModal}
        onSaveDraft={() => setExitModal(false)}
        open={exitModal}
      />
    </>
  )
}
