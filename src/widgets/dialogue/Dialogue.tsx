import { AvatarBox } from '@/src/shared/ui/avatar/AvatarBox'
import { Input } from '@/src/shared/ui/input'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { Message } from '@/src/widgets/dialogue/message/Message'

import s from './dialogue.module.scss'

export const Dialogue = () => {
  return (
    <div className={s.dialogue}>
      <header className={s.header}>
        <AvatarBox size={'s'} />
        <Typography option={'regular_text16'}>NAME</Typography>
      </header>
      <div className={s.dialogueBody}>
        <Message />
      </div>
      <div className={s.footer}>
        <Input className={s.input} onInput={() => {}} placeholder={'Type Message'} />
      </div>
    </div>
  )
}
