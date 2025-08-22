'use client'

import { Typography } from '@/src/shared/ui/typography/Typography'
import { Dialogue } from '@/src/widgets/dialogue/Dialogue'
import { DialoguePartnersSection } from '@/src/widgets/dialoguePartners/DialoguePartnersSection'
import { useParams } from 'next/navigation'

import s from './ShowMessenger.module.scss'

export const ShowMessenger = () => {
  const params = useParams()
  const userId = Number(params.userId)

  return (
    <div className={s.page}>
      <div className={s.container}>
        <Typography as={'div'} className={s.searchText} option={'h1'}>
          Messenger
        </Typography>
      </div>
      <div className={s.messengerWrapper}>
        <DialoguePartnersSection />
        {userId ? (
          <Dialogue userId={userId} />
        ) : (
          <div className={s.placeholder}>
            <Typography className={s.placeholderText} weight={'medium'}>
              Choose who you would like to talk to
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
