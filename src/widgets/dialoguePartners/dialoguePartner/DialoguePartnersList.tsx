import { Fragment, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { getDialoguePartnerId } from '@/src/shared/lib/getDialoguePartnerId'
import { useGetAllMessagesQuery } from '@/src/shared/model/api/messengerApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { DialoguePartnerItem } from '@/src/widgets/dialoguePartners/dialoguePartnerItem/DialoguePartnerItem'
import Link from 'next/link'

import s from './dialoguePartner.module.scss'

export const DialoguePartnersList = () => {
  const myId = useAppSelector(selectUserId)
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data, isFetching } = useGetAllMessagesQuery({ cursor, myId })
  const { inView, ref } = useInView()
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && data && data.items.length < data.totalCount) {
      const lastMessageId = data.items[data.items.length - 1]?.id

      if (lastMessageId && lastMessageId !== cursor) {
        setCursor(lastMessageId)
      }
    }
  }, [inView, data, cursor])

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [data?.items])

  if (!data) {
    return (
      <div className={s.dialoguePartner}>
        <Loader />
      </div>
    )
  }

  const hasMore = data.items.length < data?.totalCount

  return (
    <div className={s.dialoguePartner}>
      <div ref={topRef} />
      {data.items.map((msg, index, arr) => {
        const dialoguePartnerId = getDialoguePartnerId(msg, myId!)

        return (
          <Fragment key={msg.id}>
            <Link
              className={s.dialoguePartnerLink}
              href={`/messenger?dialogId=${dialoguePartnerId}`}
            >
              <DialoguePartnerItem message={msg} />
            </Link>
            {arr.length - 1 === index && hasMore && (
              <div className={s.loaderBox} ref={ref}>
                <Loader />
              </div>
            )}
          </Fragment>
        )
      })}
      {isFetching && hasMore && <Loader />}
    </div>
  )
}
