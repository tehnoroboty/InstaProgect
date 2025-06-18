'use client'

import type { ElementType, ReactNode } from 'react'

import { Button } from '../../button/Button'
import { Typography } from '@/src/shared/ui/typography/Typography'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import s from './dropdownItem.module.scss'

type Props = {
  Icon: ElementType
  href?: string
  onClick?: () => void
  title: ReactNode | string
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
  )
}
