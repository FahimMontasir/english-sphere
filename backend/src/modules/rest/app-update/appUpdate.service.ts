import { NOTIFICATION_TOPIC, PushNotification, INotiPayload } from 'shared/pushNotification';

const sendAll = async (payload: INotiPayload): Promise<void> => {
  await PushNotification.sendWithTopic(NOTIFICATION_TOPIC.UPDATE, payload);
};

export const AppUpdateService = {
  sendAll,
};
