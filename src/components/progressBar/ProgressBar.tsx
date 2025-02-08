'use client'

import { useEffect } from 'react'

import { authApi } from '@/src/store/services/authApi'
import { baseApi } from '@/src/store/services/baseApi'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

export const ProgressBar = () => {
  const pathname = usePathname()
  const [exchangeGoogleCodeForToken] = authApi.endpoints.exchangeGoogleCodeForToken.useMutation()

  useEffect(() => {
    NProgress.configure({
      easing: 'ease',
      minimum: 0.1,
      showSpinner: false,
      speed: 800,
      trickleSpeed: 800,
    })
    const handleStart = () => NProgress.start()
    const handleComplete = () => NProgress.done()

    handleStart()
    handleComplete()

    return () => {
      NProgress.remove()
    }
  }, [pathname])

  useEffect(() => {
    console.log(useQueryResult)
  }, [])

  return null
}
