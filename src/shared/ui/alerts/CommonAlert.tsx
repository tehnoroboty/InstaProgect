'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectAppError, setAppError } from '@/src/shared/model/slices/appSlice'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'

export const CommonAlert = () => {
  const errorApi = useSelector(selectAppError)
  const dispatch = useDispatch()

  return (
    <>
      {errorApi && (
        <Alerts
          autoClose
          closeFn={() => {
            dispatch(setAppError({ error: null }))
          }}
          delay={3000}
          message={errorApi}
          type={'error'}
        />
      )}
    </>
  )
}
