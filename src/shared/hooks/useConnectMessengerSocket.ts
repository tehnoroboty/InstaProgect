import { useEffect } from 'react'

import { MessengerSocketApi } from '@/src/shared/model/api/messengerSocketApi'
import { selectUserId } from '@/src/shared/model/slices/appSlice'
import { useAppDispatch, useAppSelector } from '@/src/shared/model/store/store'

export const useConnectMessengerSocket = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(selectUserId)

  useEffect(() => {
    if (!myId) {
      return
    }
    MessengerSocketApi.createConnection(dispatch, myId)

    return () => MessengerSocketApi.abortConnection()
  }, [dispatch, myId])
}
