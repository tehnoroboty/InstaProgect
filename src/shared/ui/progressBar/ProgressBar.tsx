'use client'

import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectAppStatus } from '@/src/shared/model/slices/appSlice'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

export const ProgressBar = () => {
  const status = useSelector(selectAppStatus)

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
    if (status === 'loading') {
      handleStart()
    } else {
      handleComplete()
    }

    return () => {
      NProgress.remove()
    }
  }, [status])

  return null
}
