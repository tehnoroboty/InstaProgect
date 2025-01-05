// @flow
'use client'
import * as React from 'react'
import notification from '@/public/icons/outlinebell.svg'
import fillbell from '@/public/icons/fillbell.svg'
import Image from 'next/image'
import s from './dropdown-notification.module.scss'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { ScrollBar } from '@/src/components/scroll/ScrollBar'

const placeholderNotifications: Notification[] = [
  {
    id: '1',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '1',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '1',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '1',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '1',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '2',
    message: 'Ваша подписка истекает через 7 дней',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '3',
    message: 'Ваша подписка истекает через 7 дней',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '4',
    message: 'Ваша подписка истекает через 7 дней',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '5',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
  {
    id: '6',
    message: 'Новое Следующий платеж у вас спишется через 1 день',
    isRead: false,
    createdAt: '20.00 Sutturday',
  },
]

type Notification = {
  id: string
  message: string
  isRead: boolean
  createdAt: string
}

export const DropdownNotification = () => {
  const notifications = placeholderNotifications
  const [open, setOpen] = useState(false)
  const hasNotification = notifications.length > 0
  const filteredNotifications = notifications?.filter(notification => !notification.isRead).length

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DropdownMenu.Root onOpenChange={handleOpenChange}>
      <DropdownMenu.Trigger asChild>
        <button className={s.buttonIcon} aria-label="Customise options">
          {open ? (
            <Image src={fillbell} alt={''} width={25} height={25} />
          ) : (
            <Image src={notification} alt={''} width={24} height={24} />
          )}
          {hasNotification ? (
            <span className={s.notificationBadge}>{filteredNotifications}</span>
          ) : null}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.content} align="end" sideOffset={10}>
          <DropdownMenu.Label className={s.title}>{'Уведомления'}</DropdownMenu.Label>
          <DropdownMenu.Separator className={s.separator} />
          {!hasNotification ? (
            <DropdownMenu.Item>
              <h3 className={s.notificationTitle}>{'Уведомлений пока нет'}</h3>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item>
              <ScrollBar>
                {notifications.map(notification => (
                  <>
                    <NotificationItem key={notification.id} notification={notification} />
                    <DropdownMenu.Separator className={s.separator} />
                  </>
                ))}
              </ScrollBar>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type PropsNotification = {
  notification: Notification
}

const NotificationItem = ({ notification }: PropsNotification) => {
  const { isRead, message, createdAt } = notification
  return (
    <DropdownMenu.Item className={s.notification}>
      <h3 className={s.notificationTitle}>{'Новое уведомление!'}</h3>
      {!isRead ? <span className={s.notificationStatus}>Новое</span> : null}
      <p className={s.notificationMessages}>{message}</p>
      <span className={s.notificationTime}>{createdAt}</span>
    </DropdownMenu.Item>
  )
}
