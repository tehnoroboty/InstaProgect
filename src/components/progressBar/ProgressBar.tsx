'use client'

import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/src/store/store'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

export const ProgressBar = () => {
  const mutationRequest = useSelector((state: RootState) => state.inctagramApi.mutations)
  const queryRequest = useSelector((state: RootState) => state.inctagramApi.queries)

  NProgress.configure({
    easing: 'ease',
    minimum: 0.1,
    showSpinner: false,
    speed: 500,
    trickleSpeed: 800,
  })

  const handleStart = () => NProgress.start()
  const handleComplete = () => NProgress.done()

  useLayoutEffect(() => {
    const requestStatus =
      Object.values(mutationRequest)[0]?.status || Object.values(queryRequest)[0]?.status

    if (requestStatus) {
      if (requestStatus === 'pending') {
        handleStart()
      } else {
        handleComplete()
      }
    } else {
      handleStart()
      handleComplete()
    }

    return () => {
      NProgress.remove()
    }
  }, [mutationRequest, queryRequest])

  return null
}
