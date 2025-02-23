'use client'
import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { useSelector } from 'react-redux'

import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { HeaderMobile } from '@/src/widgets/header/headerMobile/HeaderMobile'
import { HeaderWeb } from '@/src/widgets/header/headerWeb/HeaderWeb'

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
      <HeaderWeb hasNotification={notification} isLoggedIn={isLoggedIn} title={title} />
    </header>
  )
}
