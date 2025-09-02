import { useCallback, useEffect } from 'react'

import SocketIoApi from '@/src/shared/model/api/socketApi'

export const useConnectSocket = () => {
  const connectSocket = useCallback(() => {
    SocketIoApi.createConnection()
  }, [])
  const disconnectSocket = () => {
    SocketIoApi.abortConnection()
  }

  useEffect(() => {
    connectSocket()

    return () => {
      disconnectSocket()
    }
  }, [connectSocket])
}
