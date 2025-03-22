'use client'

import React, { useState } from 'react'

import CloseIcon from '@/src/shared/assets/componentsIcons/CloseOutline'
import { useUpdatePostMutation } from '@/src/shared/model/api/postsApi'
import { CustomerError, ImageType } from '@/src/shared/model/api/types'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ConfirmationModal } from '@/src/widgets/editPost/сonfirmationModal/ConfirmationModal'
import { Title } from '@radix-ui/react-dialog'
import Image from 'next/image'

import s from '@/src/widgets/editPost/editPost.module.scss'

type Props = {
  avatarOwner: string
  imgSrc?: string
  onExitEdit: () => void // Колбэк для выхода из режима редактирования
  postDescription: string
  postId: number
  userName: string
}

export const EditPost = ({
  avatarOwner = '',
  imgSrc = '',
  onExitEdit,
  postDescription = '',
  postId,
  userName = 'userName',
}: Props) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [text, setText] = useState(postDescription)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [exitModal, setExitModal] = useState(false)

  const [updatePost, { isError, isLoading, isSuccess }] = useUpdatePostMutation()

  const onSaveChanges = async () => {
    try {
      await updatePost({
        model: {
          description: text,
        },
        postId,
      }).unwrap()
    } catch (error) {
      const err = error as CustomerError

      setErrorMessage(err.data?.messages[0].message)
    }
    onExitEdit()
  }

  const onCloseConfirmationModal = () => {
    setExitModal(false) // Закрываем ExitModal
    onExitEdit() // Возвращаемся к ModalPost
  }

  const handleCloseEditPost = () => {
    // Проверяем, изменилось ли описание
    if (text === postDescription) {
      // Если описание не изменилось, просто закрываем модальное окно
      onExitEdit()
    } else {
      // Если описание изменилось, показываем модальное окно ClosePostModal
      setExitModal(true)
    }
  }

  return (
    <>
      {isError && <Alerts message={errorMessage} position={'fixed'} type={'error'} />}
      <Dialog className={s.modal} isSimple onClose={handleCloseEditPost} open>
        <div className={s.header}>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {'Edit Post'}
            </Typography>
          </Title>
          <Button className={s.closeButton} onClick={handleCloseEditPost} variant={'transparent'}>
            <CloseIcon className={s.closeIcon} color={'white'} />
          </Button>
        </div>

        <div className={s.container}>
          <div className={s.photoBox}>
            <Image alt={'picture'} layout={'fill'} objectFit={'cover'} src={imgSrc} />
          </div>
          <div className={s.descriptionBox}>
            <UserAvatarName className={s.userAvatarName} url={avatarOwner} username={userName} />
            <TextAreaWithValidation
              className={s.addPublication}
              label={'Add publication descriptions'}
              maxLength={500}
              onErrorChange={setError}
              onTextChange={setText}
              placeholder={''}
              value={postDescription}
            />
            <Button className={s.saveChangesBtn} disabled={!!error} onClick={onSaveChanges}>
              {'Save Changes'}
            </Button>
          </div>
        </div>
      </Dialog>
      <ConfirmationModal
        modalMessage={
          'Do you really want to finish editing? If you close the changes you have made will not be saved.'
        }
        modalTitle={'Close Post'}
        onClickNo={() => setExitModal(false)}
        onCloseModal={() => setExitModal(false)}
        onCloseParentModal={onCloseConfirmationModal}
        open={exitModal}
      />
    </>
  )
}
