import React from 'react'

import * as DropdownMenuMob from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'

import s from './itemWrapper.module.scss'

type DropdownMenuItemWithLinkProps = {
  Icon: React.ElementType
  href: string
  onClick?: () => void
  title: React.ReactNode
}

export const ItemWrapper = ({ Icon, href, onClick, title }: DropdownMenuItemWithLinkProps) => {
  return (
    <DropdownMenuMob.Item>
      {onClick ? (
        <button className={s.item} type={'button'}>
          <Icon className={s.icon} />
          <span className={s.itemTitle}>{title}</span>
        </button>
      ) : (
        <Link className={s.item} href={href}>
          <Icon className={s.icon} />
          <span className={s.itemTitle}>{title}</span>
        </Link>
      )}
    </DropdownMenuMob.Item>
  )
}
