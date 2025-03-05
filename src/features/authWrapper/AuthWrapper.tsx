'use client'

import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn, setIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { Loader } from '@/src/shared/ui/loader/Loader'
import { useRouter } from 'next/navigation'

import s from './authWrapper.module.scss'

type Props = {
  login?: boolean
}

export const AuthWrapper = (props: Props) => {
  const { login } = props
  const router = useRouter()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { data, isLoading, isSuccess } = useMeQuery()

  useEffect(() => {
    if (isSuccess) {
      if (login) {
        router.push('/')
      }
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
    }
  }, [isSuccess])

  if (isLoading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  if (login && !isSuccess) {
    return null
  }

  return (
    <>
      <h1 className={s.h1}>{isSuccess ? 'Зарегистрированный' : 'Незаригестрированный'}</h1>
    </>
  )
}
