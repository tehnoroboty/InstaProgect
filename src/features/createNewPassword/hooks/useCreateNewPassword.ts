import { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { AuthRoutes } from '@/src/constants /routing'
import { setAppError } from '@/src/store/Slices/appSlice'
import { useCreateNewPasswordMutation, useRecoveryCodeMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'

import { FormType, schema } from '../validators'

export const useCreateNewPassword = () => {
  const [createNewPassword, { error, isError, isLoading, isSuccess }] =
    useCreateNewPasswordMutation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const err = error as CustomerError
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [recoveryCode] = useRecoveryCodeMutation()
  const code = searchParams.get('code') as string

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    ;(async () => {
      try {
        await recoveryCode({ recoveryCode: code }).unwrap()
      } catch (err) {
        const error = err as CustomerError
        const errorMessage = error.data?.messages[0]

        dispatch(setAppError({ error: errorMessage?.message }))
        if (errorMessage?.field === 'code') {
          router.push(AuthRoutes.FORGOT_PASSWORD)
        }
      }
    })()
  }, [code, dispatch, recoveryCode, router])

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue('newPassword', value)
    if (value) {
      clearErrors('newPassword')
    }
  }

  const onSubmit: SubmitHandler<FormType> = async data => {
    try {
      await createNewPassword({
        newPassword: data.newPassword,
        recoveryCode: code,
      }).unwrap()

      reset()
    } catch (error) {
      const typedError = error as CustomerError

      if (typedError?.data?.messages && typedError.data.messages[0]?.message) {
        setError('newPassword', { message: typedError.data.messages[0].message, type: 'manual' })
      } else {
        setError('newPassword', { message: 'Server error', type: 'manual' })
      }
      reset()
    }
  }

  const onCloseModalHandler = () => {
    setIsModalOpen(false)
    if (isSuccess) {
      router.push(AuthRoutes.LOGIN)
    }
  }

  return {
    err,
    errors,
    handleSubmit,
    isError,
    isLoading,
    isModalOpen,
    isSuccess,
    onChangeNewPassword,
    onCloseModalHandler,
    onSubmit,
    register,
    trigger,
  }
}
