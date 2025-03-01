'use client'

import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn, setIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

type Props = {
  children: ReactNode
}

export const AuthWrapper = (props: Props) => {
  const { children } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { data, isLoading, isSuccess } = useMeQuery()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/account')
    }
  }, [isLoggedIn])

  return <>{children}</>
}
