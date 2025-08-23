'use client'

import { ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

import s from './requireAuth.module.scss'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data, isError, isLoading, isSuccess } = useMeQuery(undefined, { skip: !isLoggedIn })

  useEffect(() => {
    if (isError) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [isError, router])

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [isLoggedIn, router])

  if (isLoading) {
    return (
      <div className={s.wrapper}>
        <Loader />
      </div>
    )
  }

  if (!data || !isSuccess) {
    return null
  }

  return <>{children}</>
}
