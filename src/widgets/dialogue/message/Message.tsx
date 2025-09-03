import { MessageType } from '@/src/entities/messenger/types'
import { formattedTime } from '@/src/shared/lib/formattedTime'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './message.module.scss'

type Props = {
  isMy: boolean
  message: MessageType
  userAvatar?: string
}

export const Message = ({ isMy, message, userAvatar }: Props) => {
  return (
    <div className={clsx(s.message, isMy && s.isMy)}>
      {!isMy && <AvatarBox size={'s'} src={userAvatar} />}
      <div className={s.text}>
        {message.messageType === 'TEXT' && (
          <Typography option={'regular_text14'}>{message.messageText}</Typography>
        )}
        {message.messageType === 'IMAGE' && (
          <img alt={'image'} className={s.imageMessage} src={message.messageText} />
        )}
        <Typography className={s.time} option={'small_text'}>
          {formattedTime(message.createdAt)}
        </Typography>
      </div>
    </div>
  )
}
