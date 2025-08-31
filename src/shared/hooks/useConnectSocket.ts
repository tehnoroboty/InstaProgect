import { useCallback, useEffect, useState } from 'react'

import SocketIoApi from '@/src/shared/model/api/socketApi'
import { AppDispatch } from '@/src/shared/model/store/store'

export const useConnectSocket = (dispatch: AppDispatch) => {
  const [socket, setSocket] = useState<any>(null)

  const connectSocket = useCallback(() => {
    setSocket(new SocketIoApi())
  }, [dispatch, socket])

  useEffect(() => {
    connectSocket()

    return () => {
      if (socket) {
        socket.abortConnection()
      }
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.createConnection(dispatch)
    }
  }, [dispatch, socket])

  return { socket }
}
