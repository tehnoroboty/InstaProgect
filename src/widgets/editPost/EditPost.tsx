'use client'

import React, { useState } from 'react'

import CloseIcon from '@/src/shared/assets/componentsIcons/CloseOutline'
import { useUpdatePostMutation } from '@/src/shared/model/api/postsApi'
import { CustomerError } from '@/src/shared/model/api/types'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { ClosePostModal } from '@/src/widgets/editPost/closePostModal/ClosePostModal'
import { Title } from '@radix-ui/react-dialog'
import Image from 'next/image'

import s from '@/src/widgets/editPost/editPost.module.scss'

type Props = {
  imgSrc?: string
  onExitEdit: () => void // Колбэк для выхода из режима редактирования
  postId: number
}

export const EditPost = ({ imgSrc = '', onExitEdit, postId }: Props) => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [text, setText] = useState('')
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
  }

  const handleClose = () => {
    setExitModal(false) // Закрываем ExitModal
    onExitEdit() // Возвращаемся к ModalPost
  }

  return (
    <>
      {isError && <Alerts message={errorMessage} position={'fixed'} type={'error'} />}
      <Dialog className={s.modal} isSimple onClose={() => setExitModal(true)} open>
        <div className={s.header}>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {'Edit Post'}
            </Typography>
          </Title>
          <Button
            className={s.closeButton}
            onClick={() => setExitModal(true)}
            variant={'transparent'}
          >
            <CloseIcon className={s.closeIcon} color={'white'} />
          </Button>
        </div>

        <div className={s.container}>
          <div className={s.photoBox}>
            <Image alt={'picture'} src={imgSrc} />
          </div>
          <div className={s.descriptionBox}>
            <UserAvatarName
              className={s.userAvatarName}
              url={'avatarOwner'}
              username={'userName'}
            />
            <TextAreaWithValidation
              className={s.addPublication}
              label={'Add publication descriptions'}
              maxLength={500}
              onErrorChange={setError}
              onTextChange={setText}
              placeholder={''}
            />
            <Button className={s.saveChangesBtn} disabled={!!error} onClick={onSaveChanges}>
              {'Save Changes'}
            </Button>
          </div>
        </div>
      </Dialog>
      <ClosePostModal
        modalMessage={
          'Do you really want to finish editing? If you close the changes you have made will not be saved.'
        }
        modalTitle={'Close Post'}
        onClickNo={() => setExitModal(false)}
        onCloseModal={() => setExitModal(false)}
        onCloseParentModal={handleClose}
        open={exitModal}
      />
    </>
  )
}
