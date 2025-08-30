import { useState } from 'react'

import {
  useGetMessagesByUserQuery,
  useSendMessageMutation,
} from '@/src/shared/model/api/messengerApi'
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
  const [text, setText] = useState('')

  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  if (!partner) {
    return null
  }

  const handleSend = async () => {
    if (!text.trim()) {
      return
    }

    await sendMessage({ message: text.trim(), receiverId: userId })
    setText('')
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
        {messages?.items?.map(msg => (
          <Message
            isMy={msg.ownerId === myId}
            key={msg.id}
            text={msg.messageText}
            time={msg.createdAt}
            userAvatar={avatarUrl}
          />
        ))}
      </div>
      <div className={s.footer}>
        <Input
          className={s.input}
          onChange={e => setText(e.currentTarget.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
          placeholder={'Type Message'}
          value={text}
        />
        <Button
          className={s.bth}
          disabled={!text.trim() || isLoading}
          onClick={handleSend}
          variant={'transparent'}
        >
          Send message
        </Button>
      </div>
    </div>
  )
}
