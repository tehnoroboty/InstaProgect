'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setAppError } from '@/src/store/Slices/appSlice'
import { useExchangeGoogleCodeForTokenMutation } from '@/src/store/services/authApi'
import { useRouter, useSearchParams } from 'next/navigation'
import PropagateLoader from 'react-spinners/PropagateLoader'

const GooglePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const [exchangeGoogleCodeForToken, { data, error }] = useExchangeGoogleCodeForTokenMutation()
  const dispatch = useDispatch()
  // console.log(error)

  useEffect(() => {
    const code = searchParams.get('code')

    if (!code) {
      router.push('/auth/login')
    } else {
      exchangeGoogleCodeForToken({ code, redirectUrl: 'http://localhost:3000/auth/google' })
        .unwrap()
        .catch(err => {
          // console.log(err.data.messages[0].message)
          // setErrorMessage(err.data.messages[0].message)
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
    <PropagateLoader
      color={'#ffffff'}
      cssOverride={{
        alignItems: 'center',
        color: '#ffffff',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
      // margin={10}
      size={25}
    />
  )
}

export default GooglePage
