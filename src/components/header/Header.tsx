// @flow
'use client'
import * as React from 'react'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { HeaderMobile } from '@/src/components/header/header-mob/HeaderMobile'
import { HeaderWeb } from '@/src/components/header/header-web/HeaderWeb'
import useMobile from '@/src/hooks/useMobile'

import s from './header.module.scss'

type Props = {
  isLoggedIn?: boolean
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { isLoggedIn, notification, title, ...rest } = props
  const isMobile = useMobile()

  return (
    <header {...rest} className={s.header}>
      {isMobile ? (
        <HeaderMobile title={title} />
      ) : (
        <HeaderWeb hasNotification={notification} isLoggedIn={isLoggedIn} title={title} />
      )}
    </header>
  )
}
