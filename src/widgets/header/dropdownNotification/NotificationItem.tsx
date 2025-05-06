import {Notifications} from '@/src/shared/model/api/notificationsApi'
import {MouseEvent} from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from '@/src/widgets/header/dropdownNotification/dropdownNotification.module.scss'
import {Button} from '@/src/shared/ui/button/Button'
import {EyeOutline, TrashOutline} from '@/src/shared/assets/componentsIcons'
import {Typography} from '@/src/shared/ui/typography/Typography'
import * as React from 'react'

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
    const {createdAt, id, isRead, message} = notification

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
        markAsRead(id)
    }
    const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        deleteNotification(id)
    }

    return (
        <DropdownMenu.Item className = {s.notification}>
            <div className = {s.buttonsContainer}>
                {!isRead && (
                    <Button
                        disabled = {buttonDisabled}
                        className = {s.closeIconButton}
                        onClick = {markAsReadHandler}
                        variant = {'transparent'}
                    >
                        <EyeOutline className = {s.closeIcon}/>
                    </Button>
                )}
                <Button
                    disabled = {buttonDisabled}
                    className = {s.closeIconButton}
                    onClick = {deleteHandler}
                    variant = {'transparent'}
                >
                    <TrashOutline className = {s.closeIcon}/>
                </Button>
            </div>

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
