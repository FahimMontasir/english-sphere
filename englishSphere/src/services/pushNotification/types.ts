export enum NOTI_TYPE {
  DEFAULT = "default",
  APP_UPDATE = "app-update",
  MATERIALS = "materials",
  INSTA = "insta",
  MESSAGE = "message",
  MESSAGE_REQUEST = "message-request",
}

export interface NotiPayload {
  data: {
    id: string
    type: NOTI_TYPE
    imageUrl?: string
    banner?: string
    bigText?: string
    subtitle?: string
  }

  notification: {
    title: string
    body: string
  }

  sentTime: string
}
