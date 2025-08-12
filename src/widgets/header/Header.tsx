'use client'

import { ComponentPropsWithoutRef } from 'react'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { HeaderMobile } from '@/src/widgets/header/headerMobile/HeaderMobile'
import { HeaderWeb } from '@/src/widgets/header/headerWeb/HeaderWeb'

import s from './header.module.scss'

type Props = {
  title: string
} & ComponentPropsWithoutRef<'header'>

export const Header = (props: Props) => {
  const { title, ...rest } = props

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <header {...rest} className={s.header}>
      <HeaderMobile title={title} />
      <HeaderWeb isLoggedIn={isLoggedIn} title={title} />
    </header>
  )
}
