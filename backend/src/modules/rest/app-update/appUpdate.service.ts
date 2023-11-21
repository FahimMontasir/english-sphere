import { NOTIFICATION_TOPIC, PushNotification, INotiPayload } from '../../../shared/pushNotification';
import { AppUser } from '../user/app/user.app.model';

const sendAll = async (payload: INotiPayload): Promise<void> => {
  await PushNotification.sendWithTopic(NOTIFICATION_TOPIC.UPDATE, payload);
};

const sendMulticast = async (payload: INotiPayload): Promise<void> => {
  const users = await AppUser.find({}).select('fcmTokens').lean();
  const tokens = users.flatMap(u => u.fcmTokens);

  const batchSize = 500; // we can send 500 tokens max per req
  for (let i = 0; i < tokens.length; i += batchSize) {
    const tokenChunk = tokens.slice(i, i + batchSize);
    await PushNotification.send(tokenChunk, payload);
  }
};

export const AppUpdateService = {
  sendAll,
  sendMulticast,
};
