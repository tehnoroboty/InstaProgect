import { formattedTime } from '@/src/shared/lib/formattedTime'
import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'

import s from './message.module.scss'

type Props = {
  isMy: boolean
  text: string
  time: string
  userAvatar?: string
}

export const Message = ({ isMy, text, time, userAvatar }: Props) => {
  return (
    <div className={clsx(s.message, { [s.isMy]: isMy, [s.isNotMy]: !isMy })}>
      {!isMy && <AvatarBox size={'s'} src={userAvatar} />}
      <div className={s.text}>
        <Typography option={'regular_text14'}>{text}</Typography>
        <Typography className={s.time} option={'small_text'}>
          {formattedTime(time)}
        </Typography>
      </div>
    </div>
  )
}
