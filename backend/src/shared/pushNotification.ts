import admin from 'firebase-admin';
import { logger } from './logger';

export enum NOTIFICATION_TOPIC {
  UPDATE = 'Update',
  MATERIALS = 'Materials',
}

const send = async () => {
  try {
    await admin.messaging().sendEachForMulticast({
      tokens: [],
      notification: { title: 'abc', body: '123' },
      data: {},
      android: {},
      apns: {},
    });
  } catch (error) {
    logger.error(error);
    throw new Error('Sending push notification failed');
  }
};

const sendWithTopic = async (topic: string) => {
  try {
    await admin
      .messaging()
      .sendToTopic(topic, { notification: { title: 'abc', body: 'abc' }, data: {} });
  } catch (error) {
    logger.error(error);
    throw new Error('Sending push notification failed');
  }
};

export const PushNotification = {
  send,
  sendWithTopic,
};
