'use client'

import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
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
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { data, isLoading, isSuccess } = useMeQuery()

  useEffect(() => {
    if (!isSuccess && !isLoading) {
      router.push('/')
    }
  }, [isSuccess, isLoading])

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb hasNotification={notification} isLoggedIn={isLoggedIn} title={title} />
    </header>
  )
}
