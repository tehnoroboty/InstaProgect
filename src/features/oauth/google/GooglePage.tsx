'use client'

import { useEffect } from 'react'

import { Loader } from '@/src/components/loader/Loader'
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
      router.push('/auth/login')

      return
    }

    const fetchData = async () => {
      try {
        await exchangeGoogleCodeForToken({
          code,
          redirectUrl: (process.env.NEXT_PUBLIC_BASE_URL as string) + '/auth/google',
        }).unwrap()

        router.push('/home')
      } catch (err) {
        router.push('/auth/registration')
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
