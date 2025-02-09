'use client'

import { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/src/store/store'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

export const ProgressBar = () => {
  const status = useSelector((state: RootState) => state.app.status)

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
