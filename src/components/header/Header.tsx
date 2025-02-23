'use client'
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { HeaderMobile } from '@/src/components/header/header-mob/HeaderMobile'
import { HeaderWeb } from '@/src/components/header/header-web/HeaderWeb'
import { selectIsLoggedIn } from '@/src/store/Slices/appSlice'

import s from './header.module.scss'

type Props = {
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { notification, title, ...rest } = props

  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb hasNotification={notification} isLoggedIn={isInitialized} title={title} />
    </header>
  )
}
