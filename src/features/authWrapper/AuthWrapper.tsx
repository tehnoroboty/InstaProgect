'use client'

import { type ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

import s from './authWrapper.module.scss'

type Props = {
  children?: ReactNode
}

export const AuthWrapper = ({ children }: Props) => {
  const router = useRouter()
  const { data, isLoading, isSuccess } = useMeQuery()

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
