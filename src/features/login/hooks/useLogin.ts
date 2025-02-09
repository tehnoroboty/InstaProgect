import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { setIsLoggedIn } from '@/src/store/Slices/appSlice'
import { useLoginMutation } from '@/src/store/services/authApi'
import { LoginError } from '@/src/store/services/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { FormType, schema } from '../validators'

export const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation()

  const router = useRouter()
  const dispatch = useDispatch()

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  })
  const disabledButton = isLoading || !isValid || Object.keys(errors).length > 0

  const onSubmit: SubmitHandler<FormType> = async formData => {
    try {
      const res = await login(formData).unwrap()

      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('sn-token', res.accessToken)
      router.push('/home')
    } catch (err) {
      const { data, status } = err as LoginError

      setError('password', { message: data.messages, type: 'manual' })
    }
  }

  return { disabledButton, errors, handleSubmit, onSubmit, register }
}
