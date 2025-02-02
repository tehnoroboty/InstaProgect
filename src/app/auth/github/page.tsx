'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

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
      router.push('/auth/login')
    }
  }, [])

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

export default GitHubPage
