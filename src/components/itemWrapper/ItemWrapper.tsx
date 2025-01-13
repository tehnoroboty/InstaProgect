'use client'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './itemWrapper.module.scss'

import { Button } from '../button/Button'

type DropdownMenuItemWithLinkProps = {
    Icon: React.ElementType
    IconActive?: React.ElementType
    href?: string
    onClick?: () => void
    title: React.ReactNode
}

export const ItemWrapper = ({
                                Icon,
                                IconActive,
                                href,
                                onClick,
                                title,
                            }: DropdownMenuItemWithLinkProps) => {
    const pathname = usePathname()
    const isActive = href === pathname
    const CurrentIcon = isActive ? IconActive || Icon : Icon

    const onClickHandler = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <>
            {href ? (
                <Link className={`${s.item} ${isActive ? s.active : ''}`} href={href}>
                    <CurrentIcon className={s.icon} />
                    <span className={`${s.itemTitle} ${isActive ? s.active : ''}`}>{title}</span>
                </Link>
            ) : (
                <Button className={s.item} onClick={onClickHandler} type={'button'} variant={'transparent'}>
                    <CurrentIcon className={s.icon} />
                    <span className={s.itemTitle}>{title}</span>
                </Button>
            )}
        </>
    )
}
