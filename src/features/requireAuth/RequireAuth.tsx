'use client'

import { ReactNode, useEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      router.replace(AuthRoutes.LOGIN)
    }
  }, [router])

  return <>{children}</>
}
