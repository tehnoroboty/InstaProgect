'use client'

import React from 'react'

import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'
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
        <Button
          as={'a'}
          className={clsx(s.item, { [s.active]: isActive })}
          href={href}
          variant={'transparent'}
        >
          <CurrentIcon className={s.icon} />
          <Typography
            className={clsx(s.itemTitle, { [s.active]: isActive })}
            option={'bold_text14'}
          >
            {title}
          </Typography>
        </Button>
      ) : (
        <Button className={s.item} onClick={onClickHandler} type={'button'} variant={'transparent'}>
          <CurrentIcon className={s.icon} />
          <Typography className={s.itemTitle} option={'bold_text14'}>
            {title}
          </Typography>
        </Button>
      )}
    </>
  )
}
