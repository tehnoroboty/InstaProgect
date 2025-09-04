import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { LastMessage } from '@/src/entities/messenger/types'
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
  const { data, isFetching } = useGetAllMessagesQuery({ cursor })
  const { inView, ref } = useInView()
  const [allMessages, setAllMessages] = useState<LastMessage[]>([])

  console.log(data)

  const getDialoguePartnerId = (message: LastMessage): number => {
    return message.ownerId === myId ? message.receiverId : message.ownerId
  }

  useEffect(() => {
    if (!data?.items.length) {
      return
    }

    setAllMessages(prev => {
      // фильтруем, чтобы не было дублей
      const newItems = data.items.filter(item => !prev.some(existing => existing.id === item.id))

      return [...prev, ...newItems]
    })
  }, [data])

  useEffect(() => {
    if (inView && data && allMessages.length < data.totalCount && allMessages.length !== 0) {
      setCursor(allMessages[allMessages.length - 1].id) // берём id последнего сообщения
    }
  }, [inView, data, allMessages])

  if (!data) {
    return (
      <div className={s.dialoguePartner}>
        <Loader />
      </div>
    )
  }

  const hasMore = allMessages.length < (data?.totalCount ?? 0)

  return (
    <div className={s.dialoguePartner}>
      {allMessages.map((msg, index, arr) => {
        const dialoguePartnerId = getDialoguePartnerId(msg)

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
