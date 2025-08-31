import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { SendMessageArgs } from '@/src/entities/messenger/types'
import { useConnectSocket } from '@/src/shared/hooks/useConnectSocket'
import { useGetMessagesByUserQuery } from '@/src/shared/model/api/messengerApi'
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
  const dispatch = useDispatch()

  const { socket } = useConnectSocket(dispatch)

  const [text, setText] = useState('')

  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })

  const myId = useAppSelector(selectUserId)
  const avatarUrl = partner?.avatars?.[0]?.url

  if (!partner) {
    return null
  }

  const handleSend = async () => {
    if (!text.trim() || !socket) {
      return
    }
    const message: SendMessageArgs = {
      message: text.trim(),
      receiverId: userId,
    }

    socket.sendMessage(message)
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
          disabled={!text.trim()}
          onClick={handleSend}
          variant={'transparent'}
        >
          Send message
        </Button>
      </div>
    </div>
  )
}
