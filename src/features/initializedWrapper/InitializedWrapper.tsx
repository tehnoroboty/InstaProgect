'use client'

import { type ReactNode, useEffect, useState } from 'react'

import { CustomerError } from '@/src/entities/errors/types'
import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import {
  selectIsInitialized,
  setIsInitialized,
  setIsLoggedIn,
} from '@/src/shared/model/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@/src/shared/ui/loader/Loader'

import s from './initializedWrapper.module.scss'

type Props = {
  children?: ReactNode
}

export const InitializedWrapper = ({ children }: Props) => {
  const isInitialized = useAppSelector(selectIsInitialized)
  const [hasToken, setHasToken] = useState<boolean | null>(null)

  const { error, isError, isLoading, isSuccess } = useMeQuery(undefined, {
    skip: hasToken === null || !hasToken,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)

    if (token) {
      setHasToken(true)
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
      setHasToken(false)
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(setIsInitialized({ isInitialized: true }))
    }
  }, [dispatch])

  useEffect(() => {
    if (hasToken === null || isLoading) {
      return
    }

    if (isError) {
      const status = (error as CustomerError)?.status || (error as CustomerError)?.data?.statusCode

      if (status === 401) {
        localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
      }
    }

    // В любом случае (успех или ошибка) помечаем как инициализировано
    dispatch(setIsInitialized({ isInitialized: true }))
  }, [dispatch, hasToken, isSuccess, isLoading, isError, error])

  if (!isInitialized) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
