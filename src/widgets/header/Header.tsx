'use client'

import { ComponentPropsWithoutRef, useEffect } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { HeaderMobile } from '@/src/widgets/header/headerMobile/HeaderMobile'
import { HeaderWeb } from '@/src/widgets/header/headerWeb/HeaderWeb'
import { useRouter } from 'next/navigation'

import s from './header.module.scss'

type Props = {
  isLogged?: boolean
  notification?: boolean
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { isLogged = false, notification, title, ...rest } = props
  const router = useRouter()
  const { data, isLoading, isSuccess } = useMeQuery()

  useEffect(() => {
    if (!isSuccess && !isLoading) {
      router.push('/')
    }
  }, [isSuccess])

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb hasNotification={notification} isLoggedIn={isSuccess || isLoading} title={title} />
    </header>
  )
}
