import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { selectAppError, setAppError, setIsLoggedIn } from '@/src/store/Slices/appSlice'
import { useLoginMutation, useRegistrationConfirmationMutation } from '@/src/store/services/authApi'
import { CustomerError, LoginError } from '@/src/store/services/types'
import { isLoginApiError } from '@/src/utils/apiErrorHandlers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'

import { FormType, schema } from '../validators'

export const useLogin = () => {
  const errorApi = useSelector(selectAppError)

  const [login, { isLoading }] = useLoginMutation()

  const [errorObj, setErrorObj] = useState<LoginError | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })

  const email = watch('email')
  const password = watch('password')

  useEffect(() => {
    if (errorApi) {
      dispatch(setAppError({ error: null }))
    }
    if (errorObj) {
      setErrorObj(null)
    }
  }, [email, password, dispatch])

  const disabledButton = isLoading || !email || !password || Object.keys(errors).length > 0

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const res = await login(formData).unwrap()

      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('sn-token', res.accessToken)
      router.push('/home')
    } catch (err) {
      if (isLoginApiError(err)) {
        const { data, status } = err

        if (status === 400) {
          setErrorObj(data)
          dispatch(setAppError({ error: data.messages }))
        }
      }
    }
    console.error('Registration failed:', errors.root)
  }

  return { disabledButton, errorObj, errors, handleSubmit, onSubmit, register }
}
