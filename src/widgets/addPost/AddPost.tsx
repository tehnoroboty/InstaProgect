'use client'
import { useEffect, useState } from 'react'

import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'

export const AddPost = () => {
  const [photos, setPhotos] = useState<string[]>([])
  const [draftExists, setDraftExists] = useState(false)

  const DRAFT_KEY = 'post_draft'

  useEffect(() => {
    setDraftExists(!!localStorage.getItem(DRAFT_KEY))
  }, [])

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ photos }))
    setDraftExists(true)
  }

  const openDraft = () => {
    const raw = localStorage.getItem(DRAFT_KEY)

    if (!raw) {
      return
    }
    const draft = JSON.parse(raw)

    setPhotos(draft.photos || [])
  }

  const discardDraft = () => {
    localStorage.removeItem(DRAFT_KEY)
    setDraftExists(false)
    setPhotos([])
  }

  const createPhoto = (photo: string) => {
    return setPhotos(prevPhotos => [...prevPhotos, photo])
  }

  return (
    <>
      <CreatePostPhoto
        download={createPhoto}
        draftExists={draftExists}
        modalType={'post'}
        openDraft={openDraft}
      />
      {photos.length !== 0 && (
        <CroppingPhoto onDiscard={discardDraft} onSaveDraft={saveDraft} photos={photos} />
      )}
    </>
  )
}
