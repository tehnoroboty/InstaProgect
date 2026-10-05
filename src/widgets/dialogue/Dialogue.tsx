import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { CustomerError } from '@/src/entities/errors/types'
import { useConnectMessengerSocket } from '@/src/shared/hooks/useConnectMessengerSocket'
import {
  useGetMessagesByUserQuery,
  useUpdateMessageStatusMutation,
} from '@/src/shared/model/api/messengerApi'
import { MessengerSocketApi } from '@/src/shared/model/api/messengerSocketApi'
import { useCreateImageForPostMutation } from '@/src/shared/model/api/postsApi'
import { useGetUserProfileByIdQuery } from '@/src/shared/model/api/usersApi'
import { selectUserId, setAppError } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
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
  const [createImageForPost, { isLoading }] = useCreateImageForPostMutation()

  const { inView, ref } = useInView({ threshold: 0.1 })
  const [updateMessageId, setUpdateMessageId] = useState<null | number>(null)
  const [messageText, setMessageText] = useState('')
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })
  const [updateMessageStatus] = useUpdateMessageStatusMutation()

  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (inView) {
      const sent: number[] = []

      messages?.items.map(msg => {
        if (msg.status !== 'READ' && myId !== msg.ownerId) {
          sent.push(msg.id)
        }
      })
      if (sent.length > 0) {
        updateMessageStatus({ ids: sent })
      }
    }
  }, [inView, messages?.items, myId, updateMessageStatus])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.items])

  useEffect(() => {
    if (updateMessageId) {
      const message = messages?.items.filter(msg => msg.id === updateMessageId)[0]

      if (message) {
        setMessageText(message?.messageText)
      }
    }
  }, [updateMessageId, messages?.items])

  const hasContent = messageText.trim() || imageFiles.length > 0

  useEffect(() => {
    if (!hasContent) {
      setUpdateMessageId(null)
    }
  }, [hasContent])

  if (!partner) {
    return null
  }

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
    if (!hasContent) {
      return
    }

    try {
      if (messageText.trim()) {
        MessengerSocketApi.sendText(userId, messageText.trim())
      }

      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async file => {
          const formData = new FormData()

          formData.append('file', file)
          const response = await createImageForPost({ file }).unwrap()
          const imageUrl = response.images[0].url

          MessengerSocketApi.sendImage(userId, imageUrl)
        })

        await Promise.all(uploadPromises)
      }

      setMessageText('')
      setImageFiles([])
    } catch (err) {
      const error = err as CustomerError
      const errorMessage =
        error.data?.messages[0]?.message || error.data.error || 'Some error occurred'

      dispatch(setAppError({ error: errorMessage }))
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hasContent) {
      void handleSendMessage()
    }
  }

  const handleUpdateMessageId = (id: number) => {
    setUpdateMessageId(id)
  }
  const handleUpdateMessage = () => {
    if (!hasContent || !updateMessageId) {
      return
    }
    MessengerSocketApi.updateText(updateMessageId, messageText.trim())
    setMessageText('')
    setUpdateMessageId(null)
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
              updateMessageId={handleUpdateMessageId}
              userAvatar={avatarUrl}
            />
          ))}
        <div ref={bottomRef} />
        <div ref={ref} />
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

            {hasContent && !updateMessageId && (
              <Button
                className={s.sendButton}
                disabled={!hasContent || isLoading}
                onClick={handleSendMessage}
                variant={'transparent'}
              >
                {isLoading ? 'Sending...' : 'Send message'}
              </Button>
            )}
            {hasContent && !!updateMessageId && (
              <Button
                className={s.sendButton}
                disabled={!hasContent}
                onClick={handleUpdateMessage}
                variant={'transparent'}
              >
                Update message
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
