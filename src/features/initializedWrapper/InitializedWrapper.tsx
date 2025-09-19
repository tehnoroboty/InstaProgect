'use client'

import { type ReactNode, useEffect, useState } from 'react'

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
  const { isError, isLoading, isSuccess } = useMeQuery(undefined, {
    skip: !trigger || !isLoggedIn,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

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
      localStorage.removeItem('accessToken')
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      setIsInitialized(true)
    } else if (isSuccess) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      setIsInitialized(true)
    }
  }, [dispatch, isSuccess, isLoading, isError])

  if (!isInitialized) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
