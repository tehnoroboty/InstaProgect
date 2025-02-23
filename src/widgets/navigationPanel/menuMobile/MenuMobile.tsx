// @flow
'use client'
import * as React from 'react'

import { Button } from '@/src/shared/ui/button/Button'
import { MenuItemType } from '@/src/widgets/navigationPanel/NavigationPanel'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './menuMobile.module.scss'

type Props = {
  items: MenuItemType[]
}
const getCurrentIcon = (
  isActive: boolean,
  Icon: React.ElementType,
  IconActive?: React.ElementType
) => {
  return isActive ? IconActive || Icon : Icon
}

export const MenuMobile = ({ items }: Props) => {
  const pathname = usePathname()

  return (
    <div className={s.container}>
      {items.map((item, index) => {
        const isActive = item.href === pathname
        const CurrentIcon = getCurrentIcon(isActive, item.icon, item.iconActive)

        if (!item.href) {
          return null
        }

        return (
          <Link href={item.href} key={index} passHref>
            <Button as={'span'} className={s.item} variant={'transparent'}>
              <CurrentIcon className={clsx(s.icon, { [s.active]: isActive })} />
            </Button>
          </Link>
        )
      })}
    </div>
  )
}
