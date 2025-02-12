import { ChangeEvent, useRef, useState } from 'react'
/* eslint-disable import/no-named-as-default */
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import { usePasswordRecoveryMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
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
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      recaptcha: '',
    },
    mode: 'onChange',
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
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
        email: data.email,
        recaptcha: data.recaptcha,
      }).unwrap()

      setIsModalOpen(true)
      setServerError(null)
      clearErrors(['email', 'recaptcha'])
      setFormSubmit(true)
    } catch (error) {
      const typedError = error as CustomerError

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

  const isButtonDisabled = !isValid || recaptchaError !== null || isLoading

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
