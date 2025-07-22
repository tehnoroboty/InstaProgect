'use client'

import { ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

import s from './requireAuth.module.scss'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()
  const { data, isError, isLoading, isSuccess } = useMeQuery()

  useEffect(() => {
    if (isError) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [isError, router])

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
