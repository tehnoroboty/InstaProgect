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
import { Message } from '@/src/widgets/dialogue/message/Message'
import Link from 'next/link'

import s from './dialogue.module.scss'

type Props = {
  userId: number
}

export const Dialogue = ({ userId }: Props) => {
  useConnectMessengerSocket()

  const [messageText, setMessageText] = useState('')
  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })

  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages?.items])

  if (!partner) {
    return null
  }

  const hasContent = messageText.trim()

  const handleSendMessage = async () => {
    if (!hasContent) {
      return
    }
    MessengerSocketApi.sendText(userId, messageText.trim())
    setMessageText('')
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
              text={msg.messageText}
              time={msg.createdAt}
              userAvatar={avatarUrl}
            />
          ))}
        <div ref={bottomRef} />
      </div>
      <div className={s.footer}>
        <Input
          className={s.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={'Type Message'}
          value={messageText}
        />
        {hasContent && (
          <Button
            className={s.bth}
            disabled={!hasContent}
            onClick={handleSendMessage}
            variant={'transparent'}
          >
            Send message
          </Button>
        )}
      </div>
    </div>
  )
}
