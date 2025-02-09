import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRegistrationEmailResendingMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormType, schema } from '../validators'

export const useLinkExpiredForm = () => {
  const {
    clearErrors,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setValue('email', value)
    if (value) {
      clearErrors('email')
    }
  }
  const [registrationEmailResending, { isLoading }] = useRegistrationEmailResendingMutation()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const registrationEmailResendingData = {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        email: formData.email,
      }

      await registrationEmailResending(registrationEmailResendingData).unwrap()

      setShowSuccessMessage(true)
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'email') {
        setError('email', { message: errorMessage.message, type: 'manual' })
      }
    }
  }

  const handleCloseMessage = () => {
    setShowSuccessMessage(false)
    reset()
  }

  return {
    errors,
    getValues,
    handleCloseMessage,
    handleSubmit,
    isLoading,
    isValid,
    onChangeHandler,
    onSubmit,
    register,
    showSuccessMessage,
    trigger,
  }
}
