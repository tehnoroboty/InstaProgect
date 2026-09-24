import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { ShowSearch } from '@/src/features/showSearch/ShowSearch'

export default function SearchPage() {
  return (
    <RequireAuth>
      <ShowSearch />
    </RequireAuth>
  )
}
