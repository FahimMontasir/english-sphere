import { IDecodedUser } from 'interfaces/user';
import { IFcmToken } from './user.app.interface';
import { AppUser } from './user.app.model';

const refreshFcmToken = async (decodedUser: IDecodedUser, fcmToken: IFcmToken): Promise<void> => {
  const { _id } = decodedUser;

  const userExists = await AppUser.findById(_id);
  if (userExists) {
    const othersFcmTokens = userExists.fcmTokens.filter(v => v.device !== fcmToken.device);
    const fcmTokens = [...othersFcmTokens, fcmToken];

    userExists.fcmTokens = fcmTokens;

    await userExists.save();
  }
};

export const AppUserService = {
  refreshFcmToken,
};
