'use client'
import * as React from 'react'
import { Fragment, MouseEvent, useState } from 'react'

import {
  EyeOutline,
  Fillbell,
  Outlinebell,
  TrashOutline,
} from '@/src/shared/assets/componentsIcons'
import { useConnectSocket } from '@/src/shared/hooks/useConnectSocket'
import {
  Notifications,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/src/shared/model/api/notificationsApi'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownNotification.module.scss'

export const DropdownNotification = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data: notifications } = useGetNotificationsQuery({ cursor, pageSize: 10 })
  const dispatch = useAppDispatch()

  useConnectSocket(dispatch)

  if (!notifications) {
    return null
  }

  const hasMore = notifications.totalCount > notifications.items.length

  const getNotificationMore = () => {
    setCursor(notifications.items[notifications.items.length - 1].id)
  }

  const hasNotification = notifications.items.length !== 0
  const notReadCount = notifications.notReadCount
  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button className={s.buttonIcon} type={'button'}>
          {open ? <Fillbell className={s.icon} /> : <Outlinebell />}
          {hasNotification && (
            <Typography as={'span'} className={s.notificationBadge} option={'small_text'}>
              {notReadCount}
            </Typography>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.content} sideOffset={10}>
          <DropdownMenu.Label className={s.title}>{'Уведомления'}</DropdownMenu.Label>
          <DropdownMenu.Separator className={s.separator} />
          {!hasNotification ? (
            <DropdownMenu.Item>
              <Typography as={'h3'} option={'h3'}>
                {'Уведомлений пока нет'}
              </Typography>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item className={s.items}>
              {notifications.items.map(notification => (
                <Fragment key={notification.id}>
                  <NotificationItem notification={notification} />
                  <DropdownMenu.Separator className={s.separator} />
                </Fragment>
              ))}
            </DropdownMenu.Item>
          )}
          {hasMore && (
            <>
              <DropdownMenu.Separator className={s.separator} />
              <DropdownMenu.Label className={s.seeMore}>
                <Button onClick={getNotificationMore} variant={'transparent'}>
                  {'See more'}
                </Button>
              </DropdownMenu.Label>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type PropsNotification = {
  notification: Notifications
}

const NotificationItem = ({ notification }: PropsNotification) => {
  const { createdAt, id, isRead, message } = notification
  const [markAsRead] = useMarkAsReadMutation()
  const [deleteNotification] = useDeleteNotificationMutation()

  function plural(
    value: number,
    variants: { [key: string]: string } = {},
    locale: string = 'ru-RU'
  ): string {
    const key = new Intl.PluralRules(locale).select(value)

    return variants[key] || ''
  }

  function timeElapsedSince(date: string) {
    const now: Date = new Date()
    const pastDate: Date = new Date(date)
    const diffMs = +now - +pastDate // разница в миллисекундах

    const seconds = Math.floor(diffMs / 1000)

    if (seconds < 60) {
      return `${seconds} ${plural(seconds, {
        few: 'секунд',
        many: 'секунд',
        one: 'секунда',
      })} назад`
    }
    const minutes = Math.floor(seconds / 60)

    if (minutes < 60) {
      return `${minutes} ${plural(minutes, {
        few: 'минуты',
        many: 'минут',
        one: 'минута',
      })} назад`
    }
    const hours = Math.floor(minutes / 60)

    if (hours < 24) {
      return `${hours} ${plural(hours, {
        few: 'час',
        many: 'часов',
        one: 'час',
      })} назад`
    }
    const days = Math.floor(hours / 24)

    if (days < 7) {
      return `${days} ${plural(days, {
        few: 'дня',
        many: 'дней',
        one: 'день',
      })} назад`
    }
    const weeks = Math.floor(days / 7)

    return `${weeks} ${plural(weeks, {
      few: 'недели',
      many: 'недель',
      one: 'неделя',
    })} назад`
  }

  const markAsReadHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    markAsRead({ ids: [id] })
  }
  const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    deleteNotification({ id })
  }

  return (
    <DropdownMenu.Item className={s.notification}>
      <div className={s.buttonsContainer}>
        {!isRead && (
          <Button className={s.closeIconButton} onClick={markAsReadHandler} variant={'transparent'}>
            <EyeOutline className={s.closeIcon} />
          </Button>
        )}
        <Button className={s.closeIconButton} onClick={deleteHandler} variant={'transparent'}>
          <TrashOutline className={s.closeIcon} />
        </Button>
      </div>

      <Typography as={'h3'} option={'h3'}>
        {'Новое уведомление!'}
      </Typography>
      {!isRead && (
        <Typography as={'span'} className={s.notificationStatus} option={'small_text'}>
          {'Новое'}
        </Typography>
      )}
      <Typography className={s.notificationMessages}>{message}</Typography>
      <Typography as={'span'} className={s.notificationTime} option={'small_text'}>
        {timeElapsedSince(createdAt)}
      </Typography>
    </DropdownMenu.Item>
  )
}
