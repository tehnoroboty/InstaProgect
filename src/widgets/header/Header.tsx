'use client'

import { ComponentPropsWithoutRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLazyMeQuery, useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn, setIsLoggedIn } from '@/src/shared/model/slices/appSlice'
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
  const [getMe] = useLazyMeQuery()

  useEffect(() => {
    const logout = () => {
      getMe()
      router.push('/')
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isLoggedIn') {
        logout()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb hasNotification={notification} isLoggedIn={isLogged} title={title} />
    </header>
  )
}
