import { useEffect } from 'react'

import { AuthRoutes } from '@/src/constants/routing'
import { useRegistrationConfirmationMutation } from '@/src/store/services/authApi'
import { CustomerError } from '@/src/store/services/types'
import { useRouter, useSearchParams } from 'next/navigation'

export const useRegistrationConfirmationForm = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [confirmRegistration] = useRegistrationConfirmationMutation()

  useEffect(() => {
    ;(async () => {
      try {
        // Получаем параметры через useSearchParams
        const code = searchParams.get('code') as string

        await confirmRegistration({ confirmationCode: code }).unwrap()
      } catch (err) {
        const error = err as CustomerError
        const errorMessage = error.data?.messages[0]?.message

        // Проверяем сообщение об ошибке и выполняем перенаправление при необходимости
        if (errorMessage === 'Confirmation code is invalid') {
          router.push('/auth/registration-email-resending')
        }
      }
    })()
  }, [searchParams, confirmRegistration, router])
}
