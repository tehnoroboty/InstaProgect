import {io, Socket} from 'socket.io-client';
import {AppDispatch} from "@/src/shared/model/store/store";
import {Notifications, notificationsApi} from "@/src/shared/model/api/notificationsApi";

type NotificationSocket = Notifications & {
    eventType: number,
    clientId: string,
    notifyAt: string,
}

class SocketIoApi {
    static socket: Socket | null = null;

    static abortConnection() {
        if (this.socket) {
            this.socket.disconnect()
        }
    }

    static creatConnection(dispatch: AppDispatch) {
        const token = localStorage.getItem('accessToken');
        const options = {query: {accessToken: token}}

        this.socket = io('https://inctagram.work', options)

        this.socket.on('connect', () => {
            console.log('ws:connected');
        });
        this.socket.on('disconnect', () => {
            console.log('ws:disconnect');
        });

        this.socket.on('notifications', (data: NotificationSocket) => {
            console.log('ws:notification', data);
            const newNotification: Notifications = {
                createdAt: data.createdAt,
                isRead: data.isRead,
                message: 'TEST',
                id: data.id,
            }

            dispatch(notificationsApi.util.updateQueryData('getNotifications', {}, (draft) => {
                const existsIndex = draft.items.findIndex(item => item.id === data.id);
                if (existsIndex === -1) {
                    draft.items.unshift(newNotification);
                    draft.notReadCount += 1;
                } else {
                    draft.items[existsIndex] = newNotification;
                }
            }))
        });
    }

}

export default SocketIoApi
