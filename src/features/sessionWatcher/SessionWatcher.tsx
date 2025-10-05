'use client'

import { useEffect, useState } from 'react'

import { CustomerError } from '@/src/entities/errors/types'
import { useDevicesQuery } from '@/src/shared/model/api/devicesApi'
import { selectIsLoggedIn, setIsLoggedIn, setUserId } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'

export default function SessionWatcher() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [skipCheck, setSkipCheck] = useState(true)

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem('accessToken')) {
      setSkipCheck(false)
    }
  }, [isLoggedIn])

  const { error } = useDevicesQuery(undefined, {
    skip: skipCheck,
  })

  useEffect(() => {
    if (error) {
      const err = error as CustomerError
      const status = err?.status || err?.data?.statusCode
      const message = err?.data?.messages?.[0]?.message

      if (status === 400 && message?.includes('deviceId')) {
        localStorage.removeItem('accessToken')
        dispatch(setUserId({ userId: null }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
      }
    }
  }, [error, dispatch])

  return null
}
