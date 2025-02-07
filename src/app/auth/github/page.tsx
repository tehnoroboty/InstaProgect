'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import PulseLoader from 'react-spinners/PulseLoader'

const GitHubPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const accessToken = searchParams.get('accessToken')
  const email = searchParams.get('email')

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('sn-token', accessToken)
      // router.push('/home')
    } else {
      router.push('/auth/registration')
    }
  }, [])

  return (
    // <h1
    //   style={{
    //     alignItems: 'center',
    //     color: '#ffffff',
    //     display: 'flex',
    //     height: '100vh',
    //     justifyContent: 'center',
    //   }}
    // >
    //   Loading...
    // </h1>
    <PulseLoader
      color={'#ffffff'}
      cssOverride={{
        alignItems: 'center',
        color: '#ffffff',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
      margin={10}
      size={25}
    />
  )
}

export default GitHubPage
