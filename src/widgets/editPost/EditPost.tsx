'use client'

import React, { ChangeEvent, useState } from 'react'

import CloseIcon from '@/src/shared/assets/componentsIcons/CloseOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { TextArea } from '@/src/shared/ui/textArea/TextArea'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { Title } from '@radix-ui/react-dialog'
import Image from 'next/image'

import s from '@/src/widgets/editPost/editPost.module.scss'

import Picture from './slider.jpg'

export const EditPost = () => {
  const [showDialog, setShowDialog] = useState(true)
  const [textValue, setTextValue] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const maxLength = 500

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value

    setTextValue(newValue)
    if (newValue.length <= maxLength) {
      setError(undefined) // Очищаем ошибку, если текст в пределах допустимого
    } else {
      setError(`The maximum length should be no more than ${maxLength} characters`)
    }
  }

  const onSaveChanges = () => {
    // if (textValue.length > maxLength) {
    //   setError(`The maximum length should be no more than ${maxLength} characters`)
    //
    //   return
    // }
  }

  const toggleModalHandler = () => {
    setShowDialog(!showDialog)
  }

  return (
    <>
      <Dialog className={s.modal} isSimple onClose={toggleModalHandler} open={showDialog}>
        <div className={s.header}>
          <Title asChild>
            <Typography as={'h1'} option={'h1'}>
              {'Edit Post'}
            </Typography>
          </Title>
          <Button className={s.closeButton} onClick={() => {}} variant={'transparent'}>
            <CloseIcon className={s.closeIcon} color={'white'} />
          </Button>
        </div>

        <div className={s.container}>
          <div className={s.photoBox}>
            <Image alt={'pictire'} src={Picture} />
          </div>
          <div className={s.descriptionBox}>
            <UserAvatarName
              className={s.userAvatarName}
              url={'avatarOwner'}
              username={'userName'}
            />
            <TextArea
              error={error}
              maxLength={maxLength}
              onChange={onChangeText}
              value={textValue}
            />
            <Button className={s.saveChangesBtn} disabled={!!error} onClick={onSaveChanges}>
              {'Save Changes'}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
