import SocketIoApi from "@/src/shared/model/api/socketApi";
import {AppDispatch} from "@/src/shared/model/store/store";
import {useEffect} from "react";

export const useConnectSocket = (dispatch: AppDispatch) => {
    const connectSocket = () => {
        SocketIoApi.creatConnection(dispatch)
    }
    const disconnectSocket = () => {
        SocketIoApi.abortConnection()
    }
    useEffect(() => {
        connectSocket()
        console.log('connect socket')

        return () => {
            console.log('disconnect socket')
            disconnectSocket()
        }
    }, [])
}
