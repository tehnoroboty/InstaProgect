import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ProtectedFeed } from '@/src/widgets/protectedFeed/ProtectedFeed'

export default function Feed() {
  return (
    <RequireAuth>
      <ProtectedFeed />
    </RequireAuth>
  )
}
