'use client'
import { useEffect, useState } from 'react'

import { CreatePostPhoto } from '@/src/features/createPost/CreatePostPhoto'
import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'
import { Alerts } from '@/src/shared/ui/alerts/Alerts'

export const AddPost = () => {
  const [photos, setPhotos] = useState<string[]>([])
  const [draftExists, setDraftExists] = useState(false)
  const [alertMessage, setAlertMessage] = useState<null | string>(null)
  const [alertType, setAlertType] = useState<'error' | 'info' | 'success' | 'warning'>('success')

  const DRAFT_KEY = 'post_draft'

  useEffect(() => {
    setDraftExists(!!localStorage.getItem(DRAFT_KEY))
  }, [])

  const saveDraft = () => {
    debugger
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ photos }))
    setDraftExists(true)
  }

  const openDraft = () => {
    debugger
    const raw = localStorage.getItem(DRAFT_KEY)

    if (!raw) {
      return
    }
    const draft = JSON.parse(raw)

    setPhotos(draft.photos || [])
  }

  const discardDraft = () => {
    debugger
    localStorage.removeItem(DRAFT_KEY)

    setDraftExists(false)
    setPhotos([])
  }

  const createPhoto = (photo: string) => {
    debugger
    setPhotos(prevPhotos => [...prevPhotos, photo])
    setAlertMessage('The photo has added')
    setAlertType('success')
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

      {alertMessage && (
        <Alerts
          autoClose
          closable
          closeFn={() => setAlertMessage(null)}
          delay={3000}
          message={alertMessage}
          type={alertType}
        />
      )}
    </>
  )
}
