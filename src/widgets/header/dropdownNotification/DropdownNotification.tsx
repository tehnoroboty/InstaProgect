'use client'
import * as React from 'react'
import {Fragment, useEffect, useState} from 'react'

import {
    Fillbell,
    Outlinebell,
} from '@/src/shared/assets/componentsIcons'
import {useConnectSocket} from '@/src/shared/hooks/useConnectSocket'
import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery, useMarkAsReadMutation,
} from '@/src/shared/model/api/notificationsApi'
import {useAppDispatch} from '@/src/shared/model/store/store'
import {Typography} from '@/src/shared/ui/typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownNotification.module.scss'
import {NotificationItem} from "@/src/widgets/header/dropdownNotification/NotificationItem";
import {useInView} from "react-intersection-observer";

export const DropdownNotification = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [cursor, setCursor] = useState<number | undefined>(undefined)
    const {data: notifications} = useGetNotificationsQuery({cursor, pageSize: 10})
    const [markAsRead, {isLoading: markAsReadIsLoading}] = useMarkAsReadMutation()
    const [deleteNotification, {isLoading: deleteNotificationIsLoading}] = useDeleteNotificationMutation()
    const dispatch = useAppDispatch()
    const {inView, ref} = useInView()
    useConnectSocket(dispatch)

    const markAsReadHandler = (id: number) => {
        markAsRead({ids: [id]})
    }

    const deleteHandler = (id: number) => {
        deleteNotification({id})
    }

    useEffect(() => {
        setCursor(notifications?.items[notifications.items.length - 1].id)
    }, [inView])

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
        <DropdownMenu.Root onOpenChange = {handleOpenChange}>
            <DropdownMenu.Trigger asChild>
                <button className = {s.buttonIcon} type = {'button'}>
                    {open ? <Fillbell className = {s.icon}/> : <Outlinebell/>}
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
                            {notifications.items.map((notification, id: number, arr) => (
                                <Fragment key = {notification.id}>
                                    <NotificationItem notification = {notification} markAsRead = {markAsReadHandler}
                                                      deleteNotification = {deleteHandler}
                                                      buttonDisabled = {markAsReadIsLoading || deleteNotificationIsLoading}
                                    />
                                    <DropdownMenu.Separator className = {s.separator}/>
                                    {arr.length - 1 === id && hasMorNotifications &&
                                        <div className = {s.loadMore} ref = {ref}>
                                            <Typography option = {'bold_text16'}>Loading...</Typography>
                                        </div>
                                    }
                                </Fragment>
                            ))}
                        </DropdownMenu.Item>
                    )}

                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
