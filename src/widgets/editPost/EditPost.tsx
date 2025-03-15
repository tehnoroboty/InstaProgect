'use client'

import React, { useState } from 'react'

import CloseIcon from '@/src/shared/assets/componentsIcons/CloseOutline'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { Title } from '@radix-ui/react-dialog'
import Image from 'next/image'

import s from '@/src/widgets/editPost/editPost.module.scss'

import Picture from './slider.jpg'

export const EditPost = () => {
  const [showDialog, setShowDialog] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

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
            <TextAreaWithValidation
              className={s.addPublication}
              maxLength={500}
              onErrorChange={error => setError(error)}
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
