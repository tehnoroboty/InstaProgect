// @flow
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import s from './header.module.scss'
import { HeaderMobile } from '@/src/components/header/header-mob/HeaderMobile'

export type Props = {
  title: string
  notification?: boolean
  isLoggedIn?: boolean
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { title, notification, isLoggedIn, ...rest } = props

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} notification={notification} isLoggedIn={isLoggedIn} />
    </header>
  )
}
