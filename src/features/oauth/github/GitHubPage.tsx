'use client'

import { useEffect } from 'react'

import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './githubOAuth.module.scss'

export const GitHubPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const accessToken = searchParams.get(AUTH_KEYS.ACCESS_TOKEN)

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, accessToken)
      router.push(AuthRoutes.HOME)
    } else {
      router.push(AuthRoutes.REGISTRATION)
    }
  }, [accessToken, router])

  return (
    <div className={s.container}>
      <Loader />
    </div>
  )
}
