import { Notifications } from '@/src/shared/model/api/types'
import { MouseEvent } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from '@/src/widgets/header/dropdownNotification/dropdownNotification.module.scss'
import { Button } from '@/src/shared/ui/button/Button'
import { EyeOutline, TrashOutline } from '@/src/shared/assets/componentsIcons'
import { Typography } from '@/src/shared/ui/typography/Typography'
import * as React from 'react'
import { timeElapsedSince } from '@/src/shared/lib/timeElapsedSince'

type PropsNotification = {
  notification: Notifications
  markAsRead: (id: number) => void
  deleteNotification: (id: number) => void
  buttonDisabled: boolean
}

export const NotificationItem = ({
  notification,
  markAsRead,
  deleteNotification,
  buttonDisabled,
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
            disabled={buttonDisabled}
            className={s.closeIconButton}
            onClick={markAsReadHandler}
            variant={'transparent'}
          >
            <EyeOutline className={s.closeIcon} />
          </Button>
        )}
        <Button
          disabled={buttonDisabled}
          className={s.closeIconButton}
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
