'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useRouter } from 'next/navigation'

export const AuthWrapper = () => {
  const router = useRouter()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { data, isLoading, isSuccess } = useMeQuery()

  useEffect(() => {
    if (isSuccess || isLoggedIn) {
      router.push('/account')
    } else {
      router.push('/unregistered')
    }
  }, [isSuccess])

  return null
}
