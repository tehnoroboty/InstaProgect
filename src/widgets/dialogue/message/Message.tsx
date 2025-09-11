import { MessageType } from '@/src/entities/messenger/types'
import {
  CheckmarkOutline,
  DoneAllOutline,
  Edit2Outline,
  TrashOutline,
} from '@/src/shared/assets/componentsIcons'
import { formattedTime } from '@/src/shared/lib/formattedTime'
import { useDeleteMessageMutation } from '@/src/shared/model/api/messengerApi'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import Image from 'next/image'

import s from './message.module.scss'

type Props = {
  isMy: boolean
  message: MessageType
  updateMessageId: (id: number) => void
  userAvatar?: string
}

export const Message = ({ isMy, message, updateMessageId, userAvatar }: Props) => {
  const isImage = message.messageType === 'TEXT' && message.messageText?.startsWith('https://')
  const hasText = !!message.messageText && !isImage
  const hasImage = message.messageType === 'IMAGE' || isImage
  // console.log(message)

  const messageClass = clsx(s.message, {
    [s.imageOnly]: hasImage && !hasText,
    [s.textOrMixed]: hasText || (hasImage && hasText),
  })

  const [deleteMessage] = useDeleteMessageMutation()

  const deleteMessageHandler = () => {
    if (isMy) {
      deleteMessage(message.id)
    }
  }

  return (
    <div className={clsx(s.messageContainer, isMy && s.isMy)}>
      {!isMy && <AvatarBox size={'s'} src={userAvatar} />}
      <div className={messageClass}>
        {hasText && <Typography option={'regular_text14'}>{message.messageText}</Typography>}
        {hasImage && (
          <Image
            alt={'image'}
            className={s.imageMessage}
            height={360}
            layout={'responsive'}
            objectFit={'contain'}
            src={message.messageText}
            width={360}
          />
        )}
        <div className={s.time}>
          <Typography option={'small_text'}>{formattedTime(message.createdAt)}</Typography>
          {isMy && message.status === 'RECEIVED' && <CheckmarkOutline className={s.receivedMsg} />}
          {isMy && message.status === 'SENT' && <DoneAllOutline className={s.sentMsg} />}
          {isMy && message.status === 'READ' && <DoneAllOutline className={s.readMsg} />}
        </div>
      </div>
      {isMy && (
        <div className={s.actionsPanel}>
          <Button
            className={s.actionsPanelBtn}
            onClick={() => {
              updateMessageId(message.id)
            }}
            variant={'transparent'}
          >
            <Edit2Outline />
          </Button>
          <Button
            className={s.actionsPanelBtn}
            onClick={deleteMessageHandler}
            variant={'transparent'}
          >
            <TrashOutline />
          </Button>
        </div>
      )}
    </div>
  )
}
