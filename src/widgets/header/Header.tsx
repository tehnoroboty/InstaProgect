'use client'

import { ComponentPropsWithoutRef, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { HeaderMobile } from '@/src/widgets/header/headerMobile/HeaderMobile'
import { HeaderWeb } from '@/src/widgets/header/headerWeb/HeaderWeb'
import { useRouter } from 'next/navigation'

import s from './header.module.scss'

type Props = {
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { notification, title, ...rest } = props

  const { isLoading, isSuccess } = useMeQuery()

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb
        hasNotification={notification}
        isLoading={isLoading}
        isLoggedIn={isSuccess}
        title={title}
      />
    </header>
  )
}
