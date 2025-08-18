'use client'

import { Typography } from '@/src/shared/ui/typography/Typography'
import { Dialogue } from '@/src/widgets/dialogue/Dialogue'
import { DialoguePartners } from '@/src/widgets/dialoguePartners/DialoguePartners'

import s from './ShowMessenger.module.scss'

export const ShowMessenger = () => {
  return (
    <div className={s.page}>
      <div className={s.container}>
        <Typography as={'div'} className={s.searchText} option={'h1'}>
          Messenger
        </Typography>
      </div>
      <div className={s.messengerWrapper}>
        <DialoguePartners />
        <Dialogue />
      </div>
    </div>
  )
}
