import admin from 'firebase-admin';
import { IDecodedUser } from 'interfaces/user';
import { IAppUser, IFcmToken } from './user.app.interface';
import { AppUser } from './user.app.model';
import { NOTIFICATION_TOPIC } from 'shared/pushNotification';
import ApiError from 'errors/ApiError';

// ---------------get----------------------

// -------------------add------------------
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

const addSkill = async (decodedUser: IDecodedUser, value: string): Promise<void> => {
  const { _id } = decodedUser;

  await AppUser.findByIdAndUpdate(_id, { $addToSet: { interests: value } });
};

// ------------------------update-------------------------------
const updateUser = async (decodedUser: IDecodedUser, payload: Partial<IAppUser>): Promise<void> => {
  const { _id } = decodedUser;

  await AppUser.findByIdAndUpdate(_id, { $set: payload });
};

// -------------------------remove---------------------------------
const removeSkill = async (decodedUser: IDecodedUser, value: string): Promise<void> => {
  const { _id } = decodedUser;

  await AppUser.findByIdAndUpdate(_id, { $pull: { interests: value } });
};

const removeOtherUser = async (decodedUser: IDecodedUser, device: string): Promise<void> => {
  const { _id } = decodedUser;

  const userExists = await AppUser.findById(_id);
  if (userExists) {
    const removedToken = userExists.fcmTokens.find(v => v.device === device);
    // unsubscribe user from update topic
    if (removedToken) {
      await admin.messaging().unsubscribeFromTopic(removedToken.token, NOTIFICATION_TOPIC.UPDATE);
    } else {
      throw new ApiError(404, 'No devices found');
    }

    userExists.fcmTokens = userExists.fcmTokens.filter(v => v.device !== device);

    await userExists.save();
  }
};

export const AppUserService = {
  refreshFcmToken,
  addSkill,
  updateUser,
  removeSkill,
  removeOtherUser,
};
