'use client'
import { Suspense } from 'react'

import { RegistrationConfirmationForm } from '@/src/features/registration-confirmation-form/RegistrationConfirmationForm'

export default function RegistrationConfirmationPage() {
  return (
    <Suspense>
      <RegistrationConfirmationForm />
    </Suspense>
  )
}
