'use client'

import React from 'react'

import { Typography } from '@/src/components/typography/Typography'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'

import s from './dropdownItem.module.scss'

import { Button } from '../../button/Button'

type Props = {
  Icon: React.ElementType
  href?: string
  onClick?: () => void
  title: React.ReactNode | string
}

export const DropdownItem = ({ Icon, href, onClick, title }: Props) => {
  const pathname = usePathname()
  const isActive = href === pathname

  const onClickHandler = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <>
      <Button
        as={href ? 'a' : 'button'}
        className={s.item}
        href={href}
        onClick={onClickHandler}
        variant={'transparent'}
      >
        <Icon className={clsx(s.icon, { [s.active]: isActive })} />
        <Typography
          as={'span'}
          className={clsx(s.itemTitle, { [s.active]: isActive })}
          option={'bold_text14'}
        >
          {title}
        </Typography>
      </Button>
    </>
  )
}
