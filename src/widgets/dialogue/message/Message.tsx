import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './message.module.scss'

export const Message = () => {
  return (
    <div className={`${s.message} ${s.isMy}`}>
      <AvatarBox size={'s'} />
      <div className={s.text}>
        <Typography option={'regular_text14'}>Hi! How are you?</Typography>
        <Typography className={s.time} option={'small_text'}>
          14:56
        </Typography>
      </div>
    </div>
  )
}
