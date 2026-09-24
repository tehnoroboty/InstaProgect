'use client'
import { RequireAuth } from '@/src/features/requireAuth/RequireAuth'
import { AddPost } from '@/src/widgets/addPost/AddPost'

export default function CreateNewPost() {
  return (
    <RequireAuth>
      <AddPost />
    </RequireAuth>
  )
}
