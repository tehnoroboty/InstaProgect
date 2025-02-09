import { Suspense } from 'react'

import CreateNewPasswordCard from '@/src/features/createNewPassword/CreateNewPasswordCard'

export default function CreateNewPasswordPage() {
  return (
    <Suspense>
      <CreateNewPasswordCard />
    </Suspense>
  )
}
