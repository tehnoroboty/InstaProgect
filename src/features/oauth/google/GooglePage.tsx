'use client'

import { useEffect } from 'react'

import { Loader } from '@/src/components/loader/Loader'
import { AuthRoutes } from '@/src/constants /routing'
import { useExchangeGoogleCodeForTokenMutation } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './googleOAuth.module.scss'

export const GooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [exchangeGoogleCodeForToken] = useExchangeGoogleCodeForTokenMutation()
  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) {
      router.push(AuthRoutes.LOGIN)

      return
    }

    const fetchData = async () => {
      try {
        await exchangeGoogleCodeForToken({
          code,
          redirectUrl: (process.env.NEXT_PUBLIC_BASE_URL as string) + AuthRoutes.OAUTH_GOOGLE,
        }).unwrap()

        router.push(AuthRoutes.HOME)
      } catch (err) {
        router.push(AuthRoutes.REGISTRATION)
      }
    }

    fetchData()
  }, [code])

  return (
    <div className={s.container}>
      <Loader />
    </div>
  )
}
