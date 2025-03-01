'use client'
import { useState } from 'react'

import { CreatePost } from '@/src/features/createPost/CreatePost'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'

export const AddPost = () => {
  const [photos, setPhotos] = useState<string[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<string>('')

  const createPhoto = (photo: string) => {
    setPhotos([...photos, photo])
    setSelectedPhoto(photo)
  }

  return (
    <>
      <CreatePost download={createPhoto} />
      {selectedPhoto && <CroppingPhoto photos={photos} selectedPhoto={selectedPhoto} />}
    </>
  )
}
