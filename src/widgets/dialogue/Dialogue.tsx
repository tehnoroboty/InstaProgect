import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

import { ImagePreview } from './imagePreview/ImagePreview'
import { useConnectMessengerSocket } from '@/src/shared/hooks/useConnectMessengerSocket'
import { useGetMessagesByUserQuery } from '@/src/shared/model/api/messengerApi'
import MessengerSocketApi from '@/src/shared/model/api/messengerSocketApi'
import { useCreateImageForPostMutation } from '@/src/shared/model/api/postsApi'
import { useGetUserProfileByIdQuery } from '@/src/shared/model/api/usersApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Message } from '@/src/widgets/dialogue/message/Message'
import clsx from 'clsx'
import Link from 'next/link'

import s from './dialogue.module.scss'

type Props = {
  userId: number
}

export const Dialogue = ({ userId }: Props) => {
  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })
  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [messageText, setMessageText] = useState('')

  const [createImageForPost] = useCreateImageForPostMutation()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  console.log(messages)
  useConnectMessengerSocket()

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

  const handleSendMessage = async () => {
    if (hasContent) {
      if (messageText.trim()) {
        MessengerSocketApi.sendText(userId, messageText.trim())
      }

      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const formData = new FormData()

          formData.append('file', file) // Соответствует эндпоинту posts/image
          try {
            const result = await createImageForPost({ file }).unwrap()
            const imageUrl = result.images.url // Предполагаем, что возвращается массив

            MessengerSocketApi.sendImage(userId, imageUrl) // Отправляем URL
          } catch (error) {
            console.error('Failed to upload image:', error)
          }
        }
      }

      setMessageText('')
      setImageFiles([])
    }
  }

  // const handleSendMessage = () => {
  //   if (hasContent) {
  //     // Отправка сообщения с текстом и/или изображениями
  //     console.log('Sending message:', {
  //       images: imageFiles,
  //       text: messageText,
  //     })
  //
  //     if (messageText.trim()) {
  //       MessengerSocketApi.sendText(userId, messageText.trim())
  //     }
  //
  //     if (imageFiles.length > 0) {
  //       imageFiles.forEach(file => {
  //         MessengerSocketApi.sendImage(userId, file)
  //       })
  //     } else {
  //       MessengerSocketApi.sendImage(userId, imageFiles[0])
  //     }
  //     // Очищаем после отправки
  //     setMessageText('')
  //     setImageFiles([])
  //   }
  // }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
            <Button className={s.sendButton} onClick={handleSendMessage} variant={'transparent'}>
              {'Send message'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
