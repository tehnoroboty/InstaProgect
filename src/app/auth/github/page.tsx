'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import PropagateLoader from 'react-spinners/PropagateLoader'

const GitHubPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const accessToken = searchParams.get('accessToken')
  const email = searchParams.get('email')

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('sn-token', accessToken)
      router.push('/home')
    } else {
      router.push('/auth/registration')
    }
  }, [])

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

export default GitHubPage
