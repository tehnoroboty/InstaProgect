'use client'

import React, { useState } from 'react'

import CloseIcon from '@/src/shared/assets/componentsIcons/CloseOutline'
import { useUpdatePostMutation } from '@/src/shared/model/api/postsApi'
import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { TextAreaWithValidation } from '@/src/shared/ui/textAreaWithValidation/TextAreaWithValidation'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { UserAvatarName } from '@/src/shared/ui/userAvatarName/UserAvatarName'
import { Title } from '@radix-ui/react-dialog'
import Image from 'next/image'

import s from '@/src/widgets/editPost/editPost.module.scss'

import Picture from './slider.jpg'

type Props = {
  postId: number
}

export const EditPost = ({ postId }: Props) => {
  const [showDialog, setShowDialog] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [text, setText] = useState('')

  const [updatePost, { isError, isLoading, isSuccess }] = useUpdatePostMutation()

  const onSaveChanges = async () => {
    try {
      await updatePost({
        model: {
          description: text,
        },
        postId,
      }).unwrap() // unwrap() для обработки ошибок

      console.log('Пост успешно обновлен')
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error)
    }
  }

  const toggleModalHandler = () => {
    setShowDialog(!showDialog)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value)
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
            <Image alt={'picture'} src={Picture} />
          </div>
          <div className={s.descriptionBox}>
            <UserAvatarName
              className={s.userAvatarName}
              url={'avatarOwner'}
              username={'userName'}
            />
            <TextAreaWithValidation
              className={s.addPublication}
              error={error}
              label={'Add publication descriptions'}
              maxLength={5}
              onChange={handleTextChange}
              placeholder={''}
              setError={setError}
              value={text}
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
