'use client'

import { useSearchParams } from 'next/navigation'

const GooglePage = () => {
  const searchParams = useSearchParams()

  const code = searchParams.get('code')

  console.log('Code:', code)

  return null
}

export default GooglePage
