import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { IFcmToken } from 'modules/rest/user/app/user.app.interface';

export const NOTI_TYPE = [
  'default',
  'app-update',
  'materials',
  'insta',
  'message',
  'message-request',
] as const;
type NotiType = (typeof NOTI_TYPE)[number];

export type INotiPayload = {
  type?: NotiType;
  title: string;
  body: string;
  data: {
    screenId?: string;
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
      data: {
        title: payload.title,
        body: payload.body,
        id: uuidv4(),
        type: payload.type || 'default',
        ...payload.data,
      },
      android: {
        priority: 'high',
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
          },
        },
        headers: {
          'apns-push-type': 'background',
          'apns-priority': '5',
          'apns-topic': 'com.englishsphere', // your app bundle identifier
        },
      },
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
