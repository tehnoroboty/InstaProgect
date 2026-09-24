import { LastMessage } from '@/src/entities/messenger/types'
import { formatMessageDateForMessenger } from '@/src/shared/lib/formatMessageDateForMessenger'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './dialoguePartnerItem.module.scss'

type Props = {
  message: LastMessage
}

export const DialoguePartnerItem = ({ message }: Props) => {
  return (
    <div className={s.dialoguePartnerContainer}>
      <AvatarBox size={'s'} src={message.avatars?.[0]?.url} />
      <div className={s.dialoguePartnerInfo}>
        <div>
          <Typography className={s.truncate} option={'regular_text14'}>
            {message.userName}
          </Typography>
          <Typography className={s.grey} option={'small_text'}>
            {formatMessageDateForMessenger(message.createdAt)}
          </Typography>
        </div>
        <Typography className={clsx(s.grey, s.truncate)} option={'small_text'}>
          {message.messageText}
        </Typography>
      </div>
    </div>
  )
}
