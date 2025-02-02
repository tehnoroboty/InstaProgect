'use client'

import { useEffect } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

const GitHubPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const accessToken = searchParams.get('accessToken')
  const email = searchParams.get('email')

  console.log('accessToken:', accessToken)
  console.log('Email:', email)

  useEffect(() => {
    if (accessToken) {
      router.push('/home')

      return
    }
    router.push('/login')
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
