'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Alerts } from '@/src/components/alerts/Alerts'
import { selectAppError, setAppError } from '@/src/store/Slices/appSlice'

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
