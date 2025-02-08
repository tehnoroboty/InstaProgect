import { ChangeEvent, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { usePasswordRecoveryMutation } from '@/src/store/services/authApi'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormType, schema } from '../validators'

export const useForgotPasswordCard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation()
  const [recaptchaError, setRecaptchaError] = useState<null | string>(null)
  const [serverError, setServerError] = useState<null | string>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const {
    clearErrors,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    resolver: zodResolver(schema),
  })

  const onChangeToken = (value: null | string) => {
    if (value === null) {
      setRecaptchaError('Please verify that you are not a robot')
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    } else {
      setValue('recaptcha', value)
      setRecaptchaError(null)
    }
  }
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setValue('email', value)
    if (value) {
      clearErrors('email')
      setServerError(null)
    }
  }

  const onSubmit: SubmitHandler<FormType> = async data => {
    try {
      await passwordRecovery({
        baseUrl: 'http://localhost:3000',
        email: data.email,
        recaptcha: data.recaptcha,
      }).unwrap()

      setIsModalOpen(true)
      setServerError(null)
      clearErrors(['email', 'recaptcha'])
      setFormSubmit(true)
    } catch (error) {
      const typedError = error as { data: { messages: { field: string; message: string }[] } }

      if (typedError?.data?.messages && typedError.data.messages[0]?.message) {
        setServerError(typedError.data.messages[0].message)
      } else {
        setServerError("User with this email doesn't exist")
      }
    }
  }

  const handleResendLink = () => {
    reset()
    setFormSubmit(false)
  }

  const isButtonDisabled =
    !watch('email') || !watch('recaptcha') || recaptchaError !== null || isLoading

  return {
    errors,
    formSubmit,
    getValues,
    handleResendLink,
    handleSubmit,
    isButtonDisabled,
    isModalOpen,
    onChangeEmail,
    onChangeToken,
    onSubmit,
    recaptchaError,
    recaptchaRef,
    register,
    serverError,
    setIsModalOpen,
    trigger,
  }
}
