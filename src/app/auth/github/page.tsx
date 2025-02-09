import { Suspense } from 'react'

import { GitHubPage } from '@/src/features/oauth/github/GitHubPage'

export default function GitHub() {
  return (
    <Suspense>
      <GitHubPage />
    </Suspense>
  )
}
