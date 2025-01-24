'use client'

import { useSearchParams } from 'next/navigation'

const GitHubPage = () => {
  const searchParams = useSearchParams()

  const accessToken = searchParams.get('accessToken')
  const email = searchParams.get('email')

  console.log('accessToken:', accessToken)
  console.log('Email:', email)

  return null
}

export default GitHubPage
