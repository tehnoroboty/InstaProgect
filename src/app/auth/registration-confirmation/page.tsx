'use client'
import { Suspense } from 'react'

import { ConfirmRegistration } from '@/src/features/confirmRegistration/ConfirmRegistration'

export default function RegistrationConfirmationPage() {
  return (
    <Suspense>
      <ConfirmRegistration />
    </Suspense>
  )
}
