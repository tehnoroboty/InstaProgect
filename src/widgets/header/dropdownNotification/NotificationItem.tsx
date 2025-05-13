import { MouseEvent } from 'react'
import * as React from 'react'

import { EyeOutline, TrashOutline } from '@/src/shared/assets/componentsIcons'
import { timeElapsedSince } from '@/src/shared/lib/timeElapsedSince'
import { Notifications } from '@/src/shared/model/api/types'
import { Button } from '@/src/shared/ui/button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from '@/src/widgets/header/dropdownNotification/dropdownNotification.module.scss'

type PropsNotification = {
  buttonDisabled: boolean
  deleteNotification: (id: number) => void
  markAsRead: (id: number) => void
  notification: Notifications
}

export const NotificationItem = ({
  buttonDisabled,
  deleteNotification,
  markAsRead,
  notification,
}: PropsNotification) => {
  const { createdAt, id, isRead, message } = notification

  const markAsReadHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    markAsRead(id)
  }
  const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    deleteNotification(id)
  }

  return (
    <DropdownMenu.Item className={s.notification}>
      <div className={s.buttonsContainer}>
        {!isRead && (
          <Button
            className={s.closeIconButton}
            disabled={buttonDisabled}
            onClick={markAsReadHandler}
            variant={'transparent'}
          >
            <EyeOutline className={s.closeIcon} />
          </Button>
        )}
        <Button
          className={s.closeIconButton}
          disabled={buttonDisabled}
          onClick={deleteHandler}
          variant={'transparent'}
        >
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
