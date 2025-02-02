'use client'

import { useEffect } from 'react'

import { useExchangeGoogleCodeForTokenMutation } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'

const GooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams.get('code')

  const [exchangeGoogleCodeForToken, { data, error }] = useExchangeGoogleCodeForTokenMutation()

  useEffect(() => {
    //если код не пришел
    if (!code) {
      // куда перенаправлять пользователя?
      router.push('/login')
    } else {
      //если код пришел делаем POST запрос за токеном
      exchangeGoogleCodeForToken({ code, redirectUrl: 'http://localhost:3000/google' })

      //сохроняем токен
    }
  }, [])

  useEffect(() => {
    if (error) {
      router.push('/registration')
    } else {
      router.push('/home')
    }
  }, [error])

  return (
    <h1
      style={{
        alignItems: 'center',
        color: '#ffffff',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      Loading...
    </h1>
  )
}

export default GooglePage
