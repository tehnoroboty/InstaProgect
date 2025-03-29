'use client'

import React, { useState } from 'react'

import CloseIcon from '@/src/shared/assets/componentsIcons/CloseOutline'
import { useUpdatePostMutation } from '@/src/shared/model/api/postsApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ConfirmationModal } from '@/src/shared/ui/сonfirmationModal/ConfirmationModal'
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
  const [validationError, setValidationError] = useState<string | undefined>(undefined)
  const [text, setText] = useState(postDescription)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [updatePost, { isError, isLoading }] = useUpdatePostMutation()

  const handleSaveChanges = async () => {
    try {
      await updatePost({
        model: { description: text },
        postId,
      }).unwrap()
      onExitEdit()
    } catch (error) {
      const err = error as CustomerError

      setErrorMessage(err.data?.messages[0].message)
    }
  }

  const handleConfirmClose = () => {
    setShowConfirmation(false) // Закрываем ExitModal
    onExitEdit() // Возвращаемся к ModalPost
  }

  const handleCloseEditPost = () => {
    const hasChanges = text !== postDescription

    hasChanges ? setShowConfirmation(true) : onExitEdit()
  }

  return (
    <>
      {isError && <Alerts message={errorMessage} position={'fixed'} type={'error'} />}
      <Dialog className={s.modal} isSimple onClose={handleCloseEditPost} open>
        {isLoading && (
          <div className={s.loader}>
            <Loader />
          </div>
        )}
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
              onErrorChange={setValidationError}
              onTextChange={setText}
              placeholder={''}
              value={postDescription}
            />
            <Button
              className={s.saveChangesBtn}
              disabled={!!validationError || isLoading}
              onClick={handleSaveChanges}
            >
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
        onClickNo={() => setShowConfirmation(false)}
        onCloseModal={() => setShowConfirmation(false)}
        onPrimaryAction={handleConfirmClose}
        open={showConfirmation}
      />
    </>
  )
}
