'use client'

import { useEffect } from 'react'

import { setAppSuccess } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch } from '@/src/shared/model/store/store'

export const useSuccessAlert = (isSuccess: boolean, message: string) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAppSuccess({ success: message }))
    }
  }, [isSuccess, dispatch, message])
}
