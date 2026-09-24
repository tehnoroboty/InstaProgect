'use client'

import { type ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

import s from './authWrapper.module.scss'

type Props = {
  children?: ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
  const router = useRouter()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data, isLoading, isSuccess } = useMeQuery(undefined, { skip: !isLoggedIn })

  useEffect(() => {
    if (isSuccess && data) {
      router.push(AuthRoutes.HOME)
    }
  }, [isSuccess, data, router])

  if (isLoading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
