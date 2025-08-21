'use client'

import { Typography } from '@/src/shared/ui/typography/Typography'
import { Dialogue } from '@/src/widgets/dialogue/Dialogue'
import { DialoguePartnersSection } from '@/src/widgets/dialoguePartners/DialoguePartnersSection'

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
        <DialoguePartnersSection />
        <Dialogue />
      </div>
    </div>
  )
}
