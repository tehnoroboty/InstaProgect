import { LastMessage } from '@/src/entities/messenger/types'
import { formatMessageDateForMessenger } from '@/src/shared/lib/formatMessageDateForMessenger'
import { truncateText } from '@/src/shared/lib/truncateText'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './dialoguePartnerItem.module.scss'

type Props = {
  message: LastMessage
}

export const DialoguePartnerItem = ({ message }: Props) => {
  console.log(message)

  return (
    <div className={s.dialoguePartnerContainer}>
      <AvatarBox size={'s'} src={message.avatars?.[0]?.url} />
      <div className={s.dialoguePartnerInfo}>
        <div>
          <Typography option={'regular_text14'}>{truncateText(message.userName, 16)}</Typography>
          <Typography className={s.grey} option={'small_text'}>
            {formatMessageDateForMessenger(message.createdAt)}
          </Typography>
        </div>
        <Typography className={s.grey} option={'small_text'}>
          {truncateText(message.messageText, 22)}
        </Typography>
      </div>
    </div>
  )
}
