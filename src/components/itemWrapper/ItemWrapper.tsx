'use client'

import React from 'react'

import { Typography } from '@/src/components/typography/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './itemWrapper.module.scss'

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
          <Typography
            className={`${s.itemTitle} ${isActive ? s.active : ''}`}
            option={'bold_text14'}
          >
            {title}
          </Typography>
        </Link>
      ) : (
        <button className={s.item} onClick={onClickHandler} type={'button'}>
          <CurrentIcon className={s.icon} />
          <Typography className={s.itemTitle} option={'bold_text14'}>
            {title}
          </Typography>
        </button>
      )}
    </>
  )
}
