'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectAppError,
  selectAppSuccess,
  setAppError,
  setAppSuccess,
} from '@/src/shared/model/slices/appSlice'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'

export const CommonAlert = () => {
  const errorApi = useSelector(selectAppError)
  const successApi = useSelector(selectAppSuccess)
  const dispatch = useDispatch()

  const message: string | undefined = errorApi || successApi || undefined
  const closeFn = () => {
    if (errorApi) {
      dispatch(setAppError({ error: null }))
    }
    if (successApi) {
      dispatch(setAppSuccess({ success: null }))
    }
  }

  return (
    <>
      {(errorApi || successApi) && (
        <Alerts
          autoClose
          closeFn={closeFn}
          delay={3000}
          message={message}
          type={errorApi ? 'error' : 'success'}
        />
      )}
    </>
  )
}
