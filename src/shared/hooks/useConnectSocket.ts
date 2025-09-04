import { useCallback, useEffect } from 'react'

import SocketIoApi from '@/src/shared/model/api/socketApi'
import { AppDispatch } from '@/src/shared/model/store/store'

export const useConnectSocket = (dispatch: AppDispatch) => {
  const connectSocket = useCallback(() => {
    SocketIoApi.creatConnection(dispatch)
  }, [dispatch])
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
