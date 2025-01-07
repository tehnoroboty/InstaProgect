// @flow
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import { HeaderMobile } from '@/src/components/header/header-mob/HeaderMobile'

import s from './header.module.scss'

export type Props = {
  isLoggedIn?: boolean
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { isLoggedIn, notification, title, ...rest } = props

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile isLoggedIn={isLoggedIn} notification={notification} title={title} />
    </header>
  )
}
