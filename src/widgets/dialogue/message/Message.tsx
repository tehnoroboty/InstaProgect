import { MessageType } from '@/src/entities/messenger/types'
import { formattedTime } from '@/src/shared/lib/formattedTime'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import Image from 'next/image'

import s from './message.module.scss'

type Props = {
  isMy: boolean
  message: MessageType
  userAvatar?: string
}

export const Message = ({ isMy, message, userAvatar }: Props) => {
  // const isImage = message.messageType === 'IMAGE'
  // const isText = message.messageType === 'TEXT'
  const isImage = message.messageType === 'TEXT' && message.messageText?.startsWith('https://')
  const hasText = !!message.messageText && !isImage
  const hasImage = message.messageType === 'IMAGE' || isImage
  // console.log(message)

  return (
    <div className={clsx(s.message, isMy && s.isMy)}>
      {!isMy && <AvatarBox size={'s'} src={userAvatar} />}
      <div className={s.text}>
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
        <Typography className={s.time} option={'small_text'}>
          {formattedTime(message.createdAt)}
        </Typography>
      </div>
    </div>
  )
}
