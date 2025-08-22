import { useGetMessagesByUserQuery } from '@/src/shared/model/api/messengerApi'
import { useGetUserProfileByIdQuery } from '@/src/shared/model/api/usersApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Message } from '@/src/widgets/dialogue/message/Message'

import s from './dialogue.module.scss'

type Props = {
  userId: number
}

export const Dialogue = ({ userId }: Props) => {
  const { data: partner } = useGetUserProfileByIdQuery(userId)
  const { data: messages } = useGetMessagesByUserQuery({ dialoguePartnerId: userId })
  const myId = useAppSelector(selectUserId)

  if (!partner) {
    return null
  }

  return (
    <div className={s.dialogue}>
      <header className={s.header}>
        <AvatarBox size={'s'} src={partner.avatars[0].url} />
        <Typography option={'regular_text16'}>{partner.userName}</Typography>
      </header>
      <div className={s.dialogueBody}>
        {messages?.items?.map(msg => (
          <Message
            isMy={msg.ownerId === myId}
            key={msg.id}
            text={msg.messageText}
            time={msg.createdAt}
            userAvatar={partner.avatars[0].url}
          />
        ))}
      </div>
      <div className={s.footer}>
        <Input className={s.input} onInput={() => {}} placeholder={'Type Message'} />
      </div>
    </div>
  )
}
