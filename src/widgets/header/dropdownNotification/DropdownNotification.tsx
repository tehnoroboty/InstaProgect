'use client'
import * as React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Fillbell, Outlinebell } from '@/src/shared/assets/componentsIcons'
import { useConnectSocket } from '@/src/shared/hooks/useConnectSocket'
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/src/shared/model/api/notificationsApi'
import { useAppDispatch } from '@/src/shared/model/store/store'
import { Typography } from '@/src/shared/ui/typography/Typography'
import { NotificationItem } from '@/src/widgets/header/dropdownNotification/NotificationItem'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownNotification.module.scss'

const PAGE_SIZE = 10

export const DropdownNotification = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const { data: notifications } = useGetNotificationsQuery({ cursor, pageSize: PAGE_SIZE })
  const [markAsRead, { isLoading: markAsReadIsLoading }] = useMarkAsReadMutation()
  const [deleteNotification, { isLoading: deleteNotificationIsLoading }] =
    useDeleteNotificationMutation()
  const dispatch = useAppDispatch()
  const { inView, ref } = useInView()

  useConnectSocket(dispatch)

  const markAsReadHandler = (id: number) => {
    markAsRead({ ids: [id] })
  }

  const deleteHandler = (id: number) => {
    deleteNotification({ id })
  }

  useEffect(() => {
    if (
      notifications &&
      notifications.items.length < notifications.totalCount &&
      notifications.items.length !== 0
    ) {
      setCursor(notifications?.items[notifications.items.length - 1].id)
    }
  }, [inView, notifications])

  if (!notifications) {
    return null
  }
  const hasMorNotifications = notifications.items.length < notifications.totalCount
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
          {!!notReadCount && (
            <Typography as={'span'} className={s.notificationBadge} option={'small_text'}>
              {notReadCount}
            </Typography>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content align={'end'} className={s.content} sideOffset={10}>
          <DropdownMenu.Label className={s.title}>{'Notifications'}</DropdownMenu.Label>
          <DropdownMenu.Separator className={s.separator} />
          {!hasNotification ? (
            <DropdownMenu.Item>
              <Typography as={'h3'} option={'h3'}>
                {'No notifications yet'}
              </Typography>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item className={s.items}>
              {notifications.items.map((notification, index: number, arr) => (
                <Fragment key={notification.id}>
                  <NotificationItem
                    buttonDisabled={markAsReadIsLoading || deleteNotificationIsLoading}
                    deleteNotification={deleteHandler}
                    markAsRead={markAsReadHandler}
                    notification={notification}
                  />
                  <DropdownMenu.Separator className={s.separator} />
                  {arr.length - 1 === index && hasMorNotifications && (
                    <div className={s.seeMore} ref={ref}>
                      <Typography option={'bold_text16'}>Loading...</Typography>
                    </div>
                  )}
                </Fragment>
              ))}
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
