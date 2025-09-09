import { StatusType } from '@/src/entities/messenger/types'
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

import s from './message.module.scss'

type Props = {
  isMy: boolean
  messageId: number
  status: StatusType
  text: string
  time: string
  userAvatar?: string
}

export const Message = ({ isMy, messageId, status, text, time, userAvatar }: Props) => {
  const [deleteMessage] = useDeleteMessageMutation()

  const deleteMessageHandler = () => {
    if (isMy) {
      deleteMessage(messageId)
    }
  }

  return (
    <div className={clsx(s.message, isMy && s.isMy)}>
      {!isMy && <AvatarBox size={'s'} src={userAvatar} />}
      <div className={s.text}>
        <Typography option={'regular_text14'}>{text}</Typography>
        <div className={s.time}>
          <Typography option={'small_text'}>{formattedTime(time)}</Typography>
          {isMy && status === 'RECEIVED' && <CheckmarkOutline className={s.receivedMsg} />}
          {isMy && status === 'SENT' && <DoneAllOutline className={s.sentMsg} />}
          {isMy && status === 'READ' && <DoneAllOutline className={s.readMsg} />}
        </div>
      </div>

      {isMy && (
        <div className={s.actionsPanel}>
          <Button className={s.actionsPanelBtn} variant={'transparent'}>
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
