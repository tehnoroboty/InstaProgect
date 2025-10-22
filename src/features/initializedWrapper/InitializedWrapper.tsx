'use client'

import { type ReactNode, useEffect, useState } from 'react'

import { CustomerError } from '@/src/entities/errors/types'
import { AUTH_KEYS } from '@/src/shared/lib/constants/auth-keys'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn, setIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'
import { Loader } from '@/src/shared/ui/loader/Loader'

import s from './initializedWrapper.module.scss'

type Props = {
  children?: ReactNode
}

export const InitializedWrapper = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { error, isError, isLoading, isSuccess } = useMeQuery(undefined, {
    skip: !trigger || !isLoggedIn,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN)

    if (token) {
      setTrigger(true)
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      setIsInitialized(true)
    }
  }, [dispatch])

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (isError) {
      const status = (error as CustomerError)?.status || (error as CustomerError)?.data.statusCode

      if (status === 401) {
        localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
      }
      setIsInitialized(true)
    } else if (isSuccess) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      setIsInitialized(true)
    }
  }, [dispatch, isSuccess, isLoading, isError, error])

  if (!isInitialized) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
