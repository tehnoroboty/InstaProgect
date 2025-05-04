'use client'
import * as React from 'react'
import {Fragment, useState, MouseEvent} from 'react'

import {Fillbell, Outlinebell} from '@/src/shared/assets/componentsIcons'
import {Typography} from '@/src/shared/ui/typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {Button} from '@/src/shared/ui/button/Button'
import s from './dropdownNotification.module.scss'
import {
    Notifications,
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
    useMarkAsReadMutation
} from "@/src/shared/model/api/notificationsApi";
import CloseOutline from "@/src/shared/assets/componentsIcons/CloseOutline";


export const DropdownNotification = () => {
    const [open, setOpen] = useState<boolean>(false)
    const {data: notifications} = useGetNotificationsQuery({pageSize: 100})

    if (!notifications) {
        return null
    }

    const hasNotification = notifications.items.length !== 0
    const notReadCount = notifications.notReadCount
    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    return (
        <DropdownMenu.Root onOpenChange = {handleOpenChange}>
            <DropdownMenu.Trigger asChild>
                <button className = {s.buttonIcon} type = {'button'}>
                    {open ? (
                        <Fillbell className = {s.icon}/>
                    ) : (
                        <Outlinebell/>
                    )}
                    {hasNotification && (
                        <Typography as = {'span'} className = {s.notificationBadge} option = {'small_text'}>
                            {notReadCount}
                        </Typography>
                    )}
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content align = {'end'} className = {s.content} sideOffset = {10}>
                    <DropdownMenu.Label className = {s.title}>{'Уведомления'}</DropdownMenu.Label>
                    <DropdownMenu.Separator className = {s.separator}/>
                    {!hasNotification ? (
                        <DropdownMenu.Item>
                            <Typography as = {'h3'} option = {'h3'}>
                                {'Уведомлений пока нет'}
                            </Typography>
                        </DropdownMenu.Item>
                    ) : (
                        <DropdownMenu.Item className = {s.items}>
                            {notifications.items.map(notification => (
                                <Fragment key = {notification.id}>
                                    <NotificationItem notification = {notification}/>
                                    <DropdownMenu.Separator className = {s.separator}/>
                                </Fragment>
                            ))}
                        </DropdownMenu.Item>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

type PropsNotification = {
    notification: Notifications
}

const NotificationItem = ({notification}: PropsNotification) => {
    const {createdAt, isRead, message, id} = notification
    const [markAsRead] = useMarkAsReadMutation()
    const [deleteNotification] = useDeleteNotificationMutation()

    function plural(
        value: number,
        variants: { [key: string]: string } = {},
        locale: string = 'ru-RU'
    ): string {
        const key = new Intl.PluralRules(locale).select(value);
        return variants[key] || '';
    }

    function timeElapsedSince(date: string) {
        const now: Date = new Date();
        const pastDate: Date = new Date(date);
        const diffMs = +now - +pastDate; // разница в миллисекундах

        const seconds = Math.floor(diffMs / 1000);
        if (seconds < 60) {
            return `${seconds} ${plural(seconds, {
                one: 'секунда',
                few: 'секунд',
                many: 'секунд',
            })} назад`
        }
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} ${plural(minutes, {
                one: 'минута',
                few: 'минуты',
                many: 'минут',
            })} назад`
        }
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} ${plural(hours, {
                one: 'час',
                few: 'час',
                many: 'часов',
            })} назад`
        }
        const days = Math.floor(hours / 24);
        if (days < 7) {
            return `${days} ${plural(days, {
                one: 'день',
                few: 'дня',
                many: 'дней',
            })} назад`
        }
        const weeks = Math.floor(days / 7);
        return `${weeks} ${plural(weeks, {
            one: 'неделя',
            few: 'недели',
            many: 'недель',
        })} назад`
    }

    const markAsReadHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        markAsRead({ids: [id]})
    }
    const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        deleteNotification({id})
    }
    return (
        <DropdownMenu.Item className = {s.notification} onClick = {markAsReadHandler}>
            <Button variant = {'transparent'} className = {s.closeIconButton} onClick = {deleteHandler}>
                <CloseOutline className = {s.closeIcon}/>
            </Button>
            <Typography as = {'h3'} option = {'h3'}>
                {'Новое уведомление!'}
            </Typography>
            {!isRead && (
                <Typography as = {'span'} className = {s.notificationStatus} option = {'small_text'}>
                    {'Новое'}
                </Typography>
            )}
            <Typography className = {s.notificationMessages}>{message}</Typography>
            <Typography as = {'span'} className = {s.notificationTime} option = {'small_text'}>
                {timeElapsedSince(createdAt)}
            </Typography>
        </DropdownMenu.Item>
    )
}
