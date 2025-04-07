'use client'
import { useState } from 'react'

import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'

export const AddPost = () => {
  const [photos, setPhotos] = useState<string[]>([])

  const createPhoto = (photo: string) => {
    debugger

    return setPhotos(prevPhotos => [...prevPhotos, photo])
  }

  console.log(photos)

  return (
    <>
      <CreatePostPhoto download={createPhoto} modalType={'post'} />
      {photos.length !== 0 && <CroppingPhoto photos={photos} />}
    </>
  )
}
