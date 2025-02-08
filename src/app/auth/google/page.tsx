'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setAppError } from '@/src/store/Slices/appSlice'
import { useExchangeGoogleCodeForTokenMutation } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'

const GooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const [exchangeGoogleCodeForToken, { data, error }] = useExchangeGoogleCodeForTokenMutation()

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      router.push('/auth/login')
    } else {
      exchangeGoogleCodeForToken({ code, redirectUrl: 'https://momenttify.store/auth/google' })
        .unwrap()
        .catch(err => {
          dispatch(setAppError({ error: err.data.messages[0].message }))
        })
    }
  }, [])

  useEffect(() => {
    if (error) {
      router.push('/auth/registration')
    } else {
      if (data) {
        localStorage.setItem('sn-token', data.accessToken)
        router.push('/home')
      }
    }
  }, [error, data])

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
