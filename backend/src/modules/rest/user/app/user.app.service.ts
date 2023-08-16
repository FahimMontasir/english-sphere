import admin from 'firebase-admin';
import { IDecodedUser } from 'interfaces/user';
import { IFcmToken } from './user.app.interface';
import { AppUser } from './user.app.model';
import { NOTIFICATION_TOPIC } from 'shared/pushNotification';

const refreshFcmToken = async (decodedUser: IDecodedUser, fcmToken: IFcmToken): Promise<void> => {
  const { _id } = decodedUser;

  // subscribe user to update topic
  await admin.messaging().subscribeToTopic(fcmToken.token, NOTIFICATION_TOPIC.UPDATE);

  const userExists = await AppUser.findById(_id);
  if (userExists) {
    const removedToken = userExists.fcmTokens.find(v => v.device === fcmToken.device);
    // unsubscribe user from update topic
    if (removedToken) {
      await admin.messaging().unsubscribeFromTopic(removedToken.token, NOTIFICATION_TOPIC.UPDATE);
    }

    const othersFcmTokens = userExists.fcmTokens.filter(v => v.device !== fcmToken.device);
    const fcmTokens = [...othersFcmTokens, fcmToken];

    userExists.fcmTokens = fcmTokens;

    await userExists.save();
  }
};

export const AppUserService = {
  refreshFcmToken,
};
