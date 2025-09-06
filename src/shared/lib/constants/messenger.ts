export enum MessageStatus {
  READ = 'READ',
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
}

export const WS_EVENT_PATH = {
  ERROR: 'error',
  MESSAGE_DELETED: 'message-deleted',
  MESSAGE_SEND: 'message-send',
  NOTIFICATIONS: 'notifications',
  RECEIVE_MESSAGE: 'receive-message',
  UPDATE_MESSAGE: 'update-message',
} as const
