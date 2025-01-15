// @flow
'use client'
import * as React from 'react'
import { useState } from 'react'

import { Fillbell, Outlinebell } from '@/src/assets/componentsIcons/index'
import { Typography } from '@/src/components/typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown-notification.module.scss'

const placeholderNotifications: Notification[] = [
  {
    createdAt: '20.00 Sutturday',
    id: '1',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '1',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '1',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '1',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '1',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '2',
    isRead: false,
    message: 'Ваша подписка истекает через 7 дней',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '3',
    isRead: false,
    message: 'Ваша подписка истекает через 7 дней',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '4',
    isRead: false,
    message: 'Ваша подписка истекает через 7 дней',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '5',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
  {
    createdAt: '20.00 Sutturday',
    id: '6',
    isRead: false,
    message: ' Следующий платеж у вас спишется через 1 день',
  },
]

type Notification = {
  createdAt: string
  id: string
  isRead: boolean
  message: string
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
        <button className={s.buttonIcon} type={'button'}>
          {open ? (
            <Fillbell className={s.icon} height={24} width={24} />
          ) : (
            <Outlinebell height={24} width={24} />
          )}
          {hasNotification && (
            <Typography as={'span'} className={s.notificationBadge} option={'small_text'}>
              {filteredNotifications}
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
              {notifications.map(notification => (
                <>
                  <NotificationItem key={notification.id} notification={notification} />
                  <DropdownMenu.Separator className={s.separator} />
                </>
              ))}
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
  const { createdAt, isRead, message } = notification

  return (
    <DropdownMenu.Item className={s.notification}>
      <Typography as={'h3'} option={'h3'}>
        {'Новое уведомление!'}
      </Typography>
      {!isRead && (
        <Typography as={'span'} className={s.notificationStatus} option={'small_text'}>
          Новое
        </Typography>
      )}
      <Typography className={s.notificationMessages}>{message}</Typography>
      <Typography as={'span'} className={s.notificationTime} option={'small_text'}>
        {createdAt}
      </Typography>
    </DropdownMenu.Item>
  )
}
