'use client'

import { useEffect, useState } from 'react'

import { useExchangeGoogleCodeForTokenMutation } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { Alerts } from '@/src/components/alerts/Alerts'

const GooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const [exchangeGoogleCodeForToken, { data, error }] = useExchangeGoogleCodeForTokenMutation()

  // console.log(error)

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      router.push('/auth/login')
    } else {
      exchangeGoogleCodeForToken({ code, redirectUrl: 'http://localhost:3000' })
        .unwrap()
        .catch(err => {
          console.log(err.data.messages[0].message)
          setErrorMessage(err.data.messages[0].message)
        })
    }
  }, [])

  useEffect(() => {
    if (error) {
      // router.push('/auth/registration')
    } else {
      if (data) {
        localStorage.setItem('sn-token', data.accessToken)
        router.push('/home')
      }
    }
  }, [error, data])

  return (
    <>
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
      {errorMessage && <Alerts message={errorMessage} type={'error'} />}
    </>
  )
}

export default GooglePage
