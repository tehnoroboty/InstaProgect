'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar } from '@/src/entities/user/types'
import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { CroppingPhotoProfile } from '@/src/features/croppingPhoto/CroppingPhotoProfile/CroppingPhotoProfile'
import { useDeleteProfileAvatarMutation } from '@/src/shared/model/api/usersApi'
import { selectIsPhotoModalOpen, setIsPhotoModalOpen } from '@/src/shared/model/slices/modalSlice'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import clsx from 'clsx'

import s from './avatarContainerSettings.module.scss'

type Props = {
  myProfileAvatars: Array<Avatar> | undefined
}

export const AvatarContainerSettings = ({ myProfileAvatars }: Props) => {
  const dispatch = useDispatch()

  const isPhotoModalOpen = useSelector(selectIsPhotoModalOpen)

  const [newAvatar, setNewAvatar] = useState<string[]>([]) // Состояние для хранения загруженного фото
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<null | string>(null)
  const [alertType, setAlertType] = useState<'error' | 'info' | 'success' | 'warning' | null>(null)

  const [deleteAvatar, { isLoading: isLoadingDelete }] = useDeleteProfileAvatarMutation()

  // Открытие модалки для выбора фото
  const handleAddPhoto = () => {
    dispatch(setIsPhotoModalOpen({ isOpen: true }))
  }

  const handleClosePhotoModal = () => {
    dispatch(setIsPhotoModalOpen({ isOpen: false }))
  }

  // Функция для обновления аватара (когда пользователь выбрал фото)
  const handlePhotoSelect = (photoUrl: string) => {
    setNewAvatar([photoUrl]) // Устанавливаем загруженное фото
    handleClosePhotoModal()
  }

  const deleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      setAlertMessage('Profile photo deleted!')
      setAlertType('success')
    } catch (error) {
      setAlertMessage('Error! Server is not available!')
      setAlertType('error')
    } finally {
      setDeleteModal(false)
    }
  }

  return (
    <div className={s.photoBox}>
      {alertMessage && alertType && <Alerts message={alertMessage} type={alertType} />}
      <div className={s.avatarContainer}>
        <AvatarBox className={s.avatar} src={myProfileAvatars?.[0]?.url ?? ''} />
        {myProfileAvatars?.[0]?.url && (
          <button
            className={clsx(s.deleteBtn, { [s.disabledBtnDelete]: isLoadingDelete })}
            disabled={isLoadingDelete}
            onClick={() => setDeleteModal(true)}
            type={'button'}
          ></button>
        )}
      </div>
      <Button onClick={handleAddPhoto} type={'button'} variant={'bordered'}>
        {'Add a Profile Photo'}
      </Button>
      {isPhotoModalOpen && <CreatePostPhoto download={handlePhotoSelect} modalType={'photo'} />}
      {newAvatar.length > 0 && <CroppingPhotoProfile key={newAvatar[0]} photos={newAvatar} />}

      <Dialog
        className={s.modalDeletePhoto}
        modalTitle={'Delete Photo'}
        onClose={() => setDeleteModal(false)}
        open={deleteModal}
      >
        <div className={s.modalDeletePhotoContent}>
          {'Do you really want to delete your profile photo?'}
          <div className={s.modalBtns}>
            <Button onClick={deleteAvatarHandler} type={'button'} variant={'bordered'}>
              {'Yes'}
            </Button>
            <Button onClick={() => setDeleteModal(false)} type={'button'} variant={'primary'}>
              {'No'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
