'use client'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { initializeStore } from '@/src/shared/model/store/store'

type ChildrenType = ReactElement | ReactNode | null | undefined
export const StoreWrapper = ({ children }: { children: ChildrenType }) => {
  const store = initializeStore()

  return <Provider store={store}>{children}</Provider>
}
