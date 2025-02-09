'use client'

import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Loader } from '@/src/components/loader/Loader'
import { setAppError } from '@/src/store/Slices/appSlice'
import { useExchangeGoogleCodeForTokenMutation } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './googleOAuth.module.scss'

const GooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const [exchangeGoogleCodeForToken, { data, error }] = useExchangeGoogleCodeForTokenMutation()
  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) {
      router.push('/auth/login')

      return
    }

    const fetchData = async () => {
      try {
        const result = await exchangeGoogleCodeForToken({
          code,
          redirectUrl: 'http://localhost:3000/auth/google',
        }).unwrap()

        localStorage.setItem('sn-token', result.accessToken)
        router.push('/home')
      } catch (err) {
        const error = err as { data: { messages: [{ message: string }] } }

        dispatch(setAppError({ error: error.data.messages[0].message }))

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

export default function SuspenseWrapper() {
  return (
    <Suspense>
      <GooglePage />
    </Suspense>
  )
}
