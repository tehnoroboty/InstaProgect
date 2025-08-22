import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './dialoguePartner.module.scss'

export const DialoguePartnersList = () => {
  return (
    <div className={s.dialoguePartner}>
      <AvatarBox size={'s'} />
      <div className={s.dialoguePartnerInfo}>
        <div>
          <Typography option={'regular_text14'}>NAME</Typography>
          <Typography className={s.grey} option={'small_text'}>
            14:56
          </Typography>
        </div>
        <Typography className={s.grey} option={'small_text'}>
          Hi! How are you?
        </Typography>
      </div>
    </div>
  )
}
