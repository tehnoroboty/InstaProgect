import React from 'react'
import * as DropdownMenuMob from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import s from './ItemWrapper.module.scss'

type DropdownMenuItemWithLinkProps = {
  href: string
  title: React.ReactNode
  Icon: React.ElementType
  onClick?: () => void
}

export const ItemWrapper = ({ href, title, Icon, onClick }: DropdownMenuItemWithLinkProps) => {
  return (
    <DropdownMenuMob.Item>
      {onClick ? (
        <button type={'button'} className={s.item}>
          <Icon className={s.icon} />
          <span className={s.itemTitle}>{title}</span>
        </button>
      ) : (
        <Link href={href} className={s.item}>
          <Icon className={s.icon} />
          <span className={s.itemTitle}>{title}</span>
        </Link>
      )}
    </DropdownMenuMob.Item>
  )
}
