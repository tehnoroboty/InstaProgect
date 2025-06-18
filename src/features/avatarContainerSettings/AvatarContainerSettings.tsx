'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar } from '@/src/entities/user/types'
import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { CroppingPhotoProfile } from '@/src/features/croppingPhoto/CroppingPhotoProfile/CroppingPhotoProfile'
import { selectIsPhotoModalOpen, setIsPhotoModalOpen } from '@/src/shared/model/slices/modalSlice'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'

import s from './avatarContainerSettings.module.scss'

type Props = {
  deleteModal: () => void
  isLoadingDelete: boolean
  myProfileAvatars: Array<Avatar> | undefined
}

export const AvatarContainerSettings = ({
  deleteModal,
  isLoadingDelete,
  myProfileAvatars,
}: Props) => {
  const [newAvatar, setNewAvatar] = useState<string[]>([]) // Состояние для хранения загруженного фото
  const dispatch = useDispatch()
  const isPhotoModalOpen = useSelector(selectIsPhotoModalOpen)

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

  return (
    <div className={s.photoBox}>
      <div className={s.avatarContainer}>
        <AvatarBox className={s.avatar} src={myProfileAvatars?.[0]?.url ?? ''} />
        {myProfileAvatars?.[0]?.url && (
          <button
            className={clsx(s.deleteBtn, { [s.disabledBtnDelete]: isLoadingDelete })}
            disabled={isLoadingDelete}
            onClick={() => deleteModal()}
            type={'button'}
          ></button>
        )}
      </div>
      <Button onClick={handleAddPhoto} type={'button'} variant={'bordered'}>
        {'Add a Profile Photo'}
      </Button>
      {isPhotoModalOpen && <CreatePostPhoto download={handlePhotoSelect} modalType={'photo'} />}
      {newAvatar.length > 0 && <CroppingPhotoProfile key={newAvatar[0]} photos={newAvatar} />}
    </div>
  )
}
