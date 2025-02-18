'use client'
import * as React from 'react'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { HeaderMobile } from '@/src/components/header/header-mob/HeaderMobile'
import { HeaderWeb } from '@/src/components/header/header-web/HeaderWeb'
import { AccountRoutesUSERS, AuthRoutes } from '@/src/constants/routing'
import { useMeQuery } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './header.module.scss'

type Props = {
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { notification, title, ...rest } = props
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && data) {
      setIsInitialized(true)
      router.push(`/users/profile/${data.userId}`)
    }
  }, [data, isLoading])

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb hasNotification={notification} isLoggedIn={isInitialized} title={title} />
    </header>
  )
}
