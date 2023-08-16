import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { IFcmToken } from 'modules/rest/user/app/user.app.interface';

type NotiType = 'default' | 'app-update' | 'materials' | 'insta' | 'message' | 'message-request';

export type INotiPayload = {
  type?: NotiType;
  title: string;
  body: string;
  data: {
    imageUrl?: string;
    banner?: string;
    bigText?: string;
    subtitle?: string;
  };
};

export enum NOTIFICATION_TOPIC {
  UPDATE = 'Update',
  MATERIALS = 'Materials',
}

const send = async (fcmTokens: IFcmToken[], payload: INotiPayload) => {
  const tokens = fcmTokens.map(v => v.token);

  try {
    await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title: payload.title, body: payload.body },
      data: {
        id: uuidv4(),
        type: payload.type || 'default',
        ...payload.data,
      },
      // android: {},
      // apns: {},
    });
  } catch (error) {
    throw new Error('Sending push notification failed');
  }
};

const sendWithTopic = async (topic: NOTIFICATION_TOPIC, payload: INotiPayload) => {
  try {
    await admin.messaging().sendToTopic(topic, {
      notification: { title: payload.title, body: payload.body },
      data: {
        id: uuidv4(),
        type: payload.type || 'app-update',
        ...payload.data,
      },
    });
  } catch (error) {
    throw new Error('Sending push notification with topic failed');
  }
};

export const PushNotification = {
  send,
  sendWithTopic,
};
