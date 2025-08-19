import React from 'react'

import { useGetAllMessagesQuery } from '@/src/shared/model/api/messengerApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { DialoguePartnerItem } from '@/src/widgets/dialoguePartners/dialoguePartnerItem/DialoguePartnerItem'
import Link from 'next/link'

import s from './dialoguePartner.module.scss'

const PAGE_SIZE = 10

export const DialoguePartner = () => {
  const { data, isLoading } = useGetAllMessagesQuery({ pageSize: PAGE_SIZE })

  return (
    <div className={s.dialoguePartner}>
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}

      {data?.items.map(msg => (
        <Link className={s.dialoguePartnerLink} href={`/profile/${msg.ownerId}`} key={msg.id}>
          <DialoguePartnerItem key={msg.id} message={msg} />
        </Link>
      ))}
    </div>
  )
}
