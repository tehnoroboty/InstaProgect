// src/features/createPost/context/PostFlowContext.tsx
'use client'

import { createContext, useContext } from 'react'

type PostFlowContextType = {
  discardDraft: () => void
  saveDraft: () => void
}

export const PostFlowContext = createContext<PostFlowContextType | null>(null)

export const usePostFlow = () => {
  const ctx = useContext(PostFlowContext)

  if (!ctx) {
    throw new Error('usePostFlow must be used inside PostFlowContext.Provider')
  }

  return ctx
}
