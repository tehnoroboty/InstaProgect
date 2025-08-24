import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useGetAllMessagesQuery } from '@/src/shared/model/api/messengerApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { DialoguePartnerItem } from '@/src/widgets/dialoguePartners/dialoguePartnerItem/DialoguePartnerItem'
import Link from 'next/link'

import s from './dialoguePartner.module.scss'

export const DialoguePartnersList = () => {
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data, isFetching } = useGetAllMessagesQuery({ cursor })
  const { inView, ref } = useInView()

  useEffect(() => {
    if (inView && data && data.items.length < data.totalCount && data.items.length !== 0) {
      setCursor(data.items[data.items.length - 1].id) // берём id последнего сообщения
    }
  }, [inView, data])

  if (!data) {
    return (
      <div className={s.dialoguePartner}>
        <Loader />
      </div>
    )
  }

  const hasMore = data.items.length < data.totalCount

  return (
    <div className={s.dialoguePartner}>
      {data?.items.map((msg, index, arr) => (
        <Fragment key={msg.id}>
          <Link
            className={s.dialoguePartnerLink}
            href={`/messenger?dialogId=${msg.ownerId}`}
            key={msg.id}
          >
            <DialoguePartnerItem message={msg} />
          </Link>
          {arr.length - 1 === index && hasMore && (
            <div className={s.loaderBox} ref={ref}>
              <Loader />
            </div>
          )}
        </Fragment>
      ))}
      {isFetching && !hasMore && <Loader />}
    </div>
  )
}
