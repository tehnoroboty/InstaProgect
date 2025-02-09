'use client'

import { useEffect } from 'react'

import { Loader } from '@/src/components/loader/Loader'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './githubOAuth.module.scss'

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
    <div className={s.container}>
      <Loader />
    </div>
  )
}

export default GitHubPage
