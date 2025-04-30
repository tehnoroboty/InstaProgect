'use client'
import * as React from 'react'
import {Fragment, useState} from 'react'

import {Fillbell, Outlinebell} from '@/src/shared/assets/componentsIcons'
import {Typography} from '@/src/shared/ui/typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownNotification.module.scss'
import {Notifications, useGetNotificationsQuery} from "@/src/shared/model/api/notificationsApi";

export const DropdownNotification = () => {
    const {data: notifications} = useGetNotificationsQuery({})
    const [open, setOpen] = useState<boolean>(false)
    console.log(notifications)
    if (!notifications) {
        return null
    }


    const hasNotification = notifications.notReadCount
    const notReadCount =notifications.notReadCount

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    return (
        <DropdownMenu.Root onOpenChange = {handleOpenChange}>
            <DropdownMenu.Trigger asChild>
                <button className = {s.buttonIcon} type = {'button'}>
                    {open ? (
                        <Fillbell className = {s.icon} height = {24} width = {24}/>
                    ) : (
                        <Outlinebell height = {24} width = {24}/>
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
    const {createdAt, isRead, message} = notification

    return (
        <DropdownMenu.Item className = {s.notification}>
            <Typography as = {'h3'} option = {'h3'}>
                {'Новое уведомление!'}
            </Typography>
            {!isRead && (
                <Typography as = {'span'} className = {s.notificationStatus} option = {'small_text'}>
                    Новое
                </Typography>
            )}
            <Typography className = {s.notificationMessages}>{message}</Typography>
            <Typography as = {'span'} className = {s.notificationTime} option = {'small_text'}>
                {createdAt}
            </Typography>
        </DropdownMenu.Item>
    )
}
