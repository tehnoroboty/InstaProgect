'use client'

import { useEffect, useLayoutEffect } from 'react'

import { AuthRoutes } from '@/src/shared/lib/constants/routing'
import { useLazyMeQuery, useMeQuery } from '@/src/shared/model/api/authApi'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter, useSearchParams } from 'next/navigation'

export const MeRequest = () => {
  const router = useRouter()
  //   const { data, isSuccess } = useMeQuery()
  const [getMe] = useLazyMeQuery()

  useEffect(() => {
    getMe()
      .unwrap()
      .then(res => {
        router.push(`/users/profile/${res.userId}`)
        // router.push(`/public-posts`)
      })
      .catch(() => {
        router.push(`/public-posts`)
      })
  }, [])

  return null
}
