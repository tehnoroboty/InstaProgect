import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { setAppError } from '@/src/store/Slices/appSlice'
import { useRegistrationMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormType, schema } from '../validators'

export const useRegistrationForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const {
    formState: { errors },
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
      checkbox: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    resolver: zodResolver(schema),
  })

  const onChangeHandler = () => {
    if (ref.current) {
      const value = ref.current.checked

      setValue('checkbox', value)
    }
  }

  const disabledButton =
    !watch('email') ||
    !watch('username') ||
    !watch('password') ||
    !watch('passwordConfirmation') ||
    !watch('checkbox') ||
    Object.keys(errors).length > 0

  const [registration, { isLoading }] = useRegistrationMutation()
  const dispatch = useDispatch()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const registrationData = {
        baseUrl: 'https://momenttify.store',
        email: formData.email,
        password: formData.password,
        userName: formData.username,
      }

      await registration(registrationData).unwrap()

      setShowSuccessMessage(true)
    } catch (err) {
      const error = err as CustomerError
      const errorMessage = error.data?.messages[0]

      dispatch(setAppError({ error: null }))
      if (errorMessage?.field === 'userName') {
        setError('username', { message: errorMessage.message, type: 'manual' })
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
    isLoading,
    onChangeHandler,
    onSubmit,
    ref,
    register,
    showSuccessMessage,
    trigger,
  }
}
