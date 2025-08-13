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
  const { isLoading, isSuccess } = useMeQuery(undefined, {
    skip: !trigger || (isLoggedIn && !trigger),
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      setTrigger(true)
    } else {
      setIsInitialized(false)
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      return
    }
    setIsInitialized(true)
    if (isSuccess) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }, [dispatch, isSuccess, isLoading])

  if (!isInitialized) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
