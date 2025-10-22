'use client'

import { ReactNode, useEffect } from 'react'

import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)

    if (!token) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [router])

  return <>{children}</>
}
