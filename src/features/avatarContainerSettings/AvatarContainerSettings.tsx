'use client'
import React, { useState } from 'react'

import { Avatar } from '@/src/entities/user/types'
import { CreatePost } from '@/src/features/createPost/CreatePost'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import clsx from 'clsx'

import s from './avatarContainerSettings.module.scss'

type Props = {
  deleteModal: () => void
  isLoadingDelete: boolean
  myProfileAvatars: Array<Avatar> | undefined
  uploadAvatar: (file: File) => void
}

export const AvatarContainerSettings = ({
  deleteModal,
  isLoadingDelete,
  myProfileAvatars,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false) // Состояние для управления открытием модалки
  const [newAvatar, setNewAvatar] = useState<null | string>(null) // Состояние для хранения загруженного фото

  // Открытие модалки для выбора фото
  const handleAddPhoto = () => {
    setIsModalOpen(true)
  }

  // Функция для обновления аватара (когда пользователь выбрал фото)
  const handlePhotoSelect = (photoUrl: string) => {
    setNewAvatar(photoUrl) // Устанавливаем загруженное фото
    setIsModalOpen(false) // Закрываем модалку
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
      {isModalOpen && <CreatePost download={handlePhotoSelect} />}
    </div>
  )
}
