import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ShowMessenger } from '@/src/features/showMessenger/ShowMessenger'

export default function MessengerPage() {
  return (
    <RequireAuth>
      <ShowMessenger />
    </RequireAuth>
  )
}
