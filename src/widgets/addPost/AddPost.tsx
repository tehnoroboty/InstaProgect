'use client'
import { useState } from 'react'

import { CreatePost } from '@/src/features/createPost/CreatePost'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'

export const AddPost = () => {
  const [photos, setPhotos] = useState<string[]>([])

  const createPhoto = (photo: string) => {
    setPhotos([...photos, photo])
  }

  return (
    <>
      <CreatePost download={createPhoto} />
      {photos.length !== 0 && <CroppingPhoto photos={photos} />}
    </>
  )
}
