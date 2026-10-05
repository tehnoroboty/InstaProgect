'use client'

import { ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { selectIsInitialized, selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [isInitialized, isLoggedIn, router])

  if (!isInitialized) {
    return <Loader />
  }

  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}
