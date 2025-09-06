import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useConnectMessengerSocket } from '@/src/shared/hooks/useConnectMessengerSocket'
import { useGetMessagesByUserQuery } from '@/src/shared/model/api/messengerApi'
import { MessengerSocketApi } from '@/src/shared/model/api/messengerSocketApi'
import { useGetUserProfileByIdQuery } from '@/src/shared/model/api/usersApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { ImagePreview } from '@/src/widgets/dialogue/imagePreview/ImagePreview'
import { Message } from '@/src/widgets/dialogue/message/Message'
import clsx from 'clsx'
import Link from 'next/link'

import s from './dialogue.module.scss'

type Props = {
  userId: number
}

export const Dialogue = ({ userId }: Props) => {
  useConnectMessengerSocket()

  const [messageText, setMessageText] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })

  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.items])

  if (!partner) {
    return null
  }

  const hasContent = messageText.trim() || imageFiles.length > 0

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/') && file.size <= 1024 * 1024) {
      setImageFiles(prev => [...prev, file])
    }
  }

  const handleAddMoreImages = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.startsWith('image/') && files[i].size <= 1024 * 1024) {
          handleImageUpload(files[i])
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSendMessage = () => {
    if (!hasContent) {
      return
    }

    if (messageText.trim()) {
      MessengerSocketApi.sendText(userId, messageText.trim())
      setMessageText('')
    }

    // imageFiles.forEach(file => {
    //   MessengerSocketApi.sendImage(userId, file)
    // })

    MessengerSocketApi.sendImage(userId, 'https://via.placeholder.com/300.png')

    // MessengerSocketApi.socket?.emit('receive-message', {
    //   message:
    //     'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/trainee-instagram-api/Image/3696907b-54ff-4e9c-9e41-ef1541d55eb0_users/2084/post/41f7c084-35db-4aa4-858c-e4e15771c0dc-images-1440x1440',
    //   receiverId: userId,
    // })

    // отправляем картинки в base64
    // imageFiles.forEach(file => {
    //   const reader = new FileReader()
    //
    //   reader.onload = () => {
    //     const base64 = reader.result as string
    //
    //     console.log('Отправляю картинку:', {
    //       fileName: file.name,
    //       messageText: base64.slice(0, 100), // только первые 100 символов
    //       messageType: 'IMAGE',
    //       mimeType: file.type,
    //       receiverId: userId,
    //     })
    //
    //     MessengerSocketApi.socket?.emit('receive-message', {
    //       fileName: file.name,
    //       messageText: base64, // строка base64 вместо текста
    //       messageType: 'IMAGE',
    //       mimeType: file.type,
    //       receiverId: userId,
    //     })
    //   }
    //   reader.readAsDataURL(file) // вернёт base64 строку
    // })
    setImageFiles([])
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hasContent) {
      handleSendMessage()
    }
  }

  return (
    <div className={s.dialogue}>
      <header className={s.header}>
        <Link className={s.dialogueLink} href={`/profile/${userId}`}>
          <AvatarBox size={'s'} src={avatarUrl} />
          <Typography option={'regular_text16'}>{partner.userName}</Typography>
        </Link>
      </header>
      <div className={s.dialogueBody}>
        {messages?.items
          ?.slice()
          .reverse()
          .map(msg => (
            <Message
              isMy={msg.ownerId === myId}
              key={msg.id}
              message={msg}
              userAvatar={avatarUrl}
            />
          ))}
        <div ref={bottomRef} />
      </div>
      <div className={clsx(s.footer, { [s.noRightPadding]: hasContent })}>
        <div className={s.inputWrapper}>
          <ImagePreview
            className={s.imagePreview}
            files={imageFiles}
            onAddMore={handleAddMoreImages}
            onRemove={handleRemoveImage}
          />
          <div className={s.inputButton}>
            <Input
              className={s.input}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
              onImageUpload={handleImageUpload}
              onInput={() => {}}
              onKeyDown={handleKeyPress}
              placeholder={'Type Message'}
              showImageButton={!hasContent}
              type={'message'}
              value={messageText}
            />
            <input
              accept={'image/*'}
              className={s.hiddenFileInput}
              multiple
              onChange={handleFileSelect}
              ref={fileInputRef}
              type={'file'}
            />

            {hasContent && (
              <Button
                className={s.sendButton}
                disabled={!hasContent}
                onClick={handleSendMessage}
                variant={'transparent'}
              >
                {'Send message'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
