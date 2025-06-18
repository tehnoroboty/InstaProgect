import { Suspense } from 'react'

import { GooglePage } from '@/src/features/oauth/google/GooglePage'

export default function Google() {
  return (
    <Suspense>
      <GooglePage />
    </Suspense>
  )
}
