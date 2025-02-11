import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useRegistrationMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormType, schema } from '../validators'

export const useRegistrationForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const {
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      checkbox: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  })

  const onChangeHandler = () => {
    if (ref.current) {
      const value = ref.current.checked

      setValue('checkbox', value)
    }
  }

  const [registration, { isLoading }] = useRegistrationMutation()
  const disabledButton = !isValid || Object.keys(errors).length > 0 || isLoading
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const registrationData = {
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        email: formData.email,
        password: formData.password,
        userName: formData.userName,
      }

      await registration(registrationData).unwrap()

      setShowSuccessMessage(true)
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'userName') {
        setError('userName', { message: errorMessage.message, type: 'manual' })
      }
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
    disabledButton,
    errors,
    getValues,
    handleCloseMessage,
    handleSubmit,
    onChangeHandler,
    onSubmit,
    ref,
    register,
    showSuccessMessage,
    trigger,
  }
}
