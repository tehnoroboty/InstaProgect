'use client'

import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ApiError } from '@/src/app/auth/registration-confirmation/page'
import { useRegistrationMutation } from '@/src/store/services/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useRegistration = () => {
  const schema = z
    .object({
      checkbox: z.boolean(),
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .regex(
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          'The email must match the format example@example.com'
        ),
      password: z
        .string()
        .nonempty('Enter password')
        .min(6, 'Min 6 characters long')
        .max(20, 'Max 20 characters long')
        .regex(
          new RegExp(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/
          ),
          'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.'
        ),
      passwordConfirmation: z.string().nonempty('Confirm your password'),
      username: z
        .string()
        .nonempty('Enter username')
        .min(6, 'Min 6 characters long')
        .max(30, 'Max characters long')
        .nonempty('Enter username')
        .regex(/^[A-Za-z0-9_-]+$/, 'Invalid username'),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match',
          path: ['passwordConfirmation'],
        })
      }

      return data
    })

  type FormType = z.infer<typeof schema>

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

  const [registration] = useRegistrationMutation()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      // Формируем данные для отправки, исключая ненужные поля
      const registrationData = {
        baseUrl: 'http://localhost:3000',
        email: formData.email,
        password: formData.password,
        userName: formData.username,
      }

      // Отправляем запрос на сервер
      await registration(registrationData).unwrap()

      setShowSuccessMessage(true)
    } catch (err) {
      const error = err as ApiError
      const errorMessage = error.data?.messages[0]

      if (errorMessage?.field === 'userName') {
        setError('username', { message: errorMessage.message, type: 'manual' })
      }
      if (errorMessage?.field === 'email') {
        setError('email', { message: errorMessage.message, type: 'manual' })
      }
      console.error('Registration failed:', errors.root)
    }
  }

  // Функция для закрытия сообщения
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
