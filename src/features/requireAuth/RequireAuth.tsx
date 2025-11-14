'use client'

import { ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}
