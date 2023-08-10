// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gender from 'gender-detection';
import admin from 'firebase-admin';
import ApiError from 'errors/ApiError';
import { AppUser } from 'modules/rest/user/app/user.app.model';
import { IReq } from './auth.app.interface';
import { getCountryByTimezone } from './auth.app.utils';
import { IAppUser } from 'modules/rest/user/app/user.app.interface';
import { JwtHelper } from 'shared/jwtHelper';
import configs from 'configs';
import { IUserRoles } from 'interfaces/user';
import { Secret } from 'jsonwebtoken';
import { pick } from 'lodash';

const login = async (
  body: IReq
): Promise<{ createdUser: Partial<IAppUser>; accessToken: string } | null> => {
  const { timezone, token, fcmToken } = body;

  // firebase authentication (eg. verify id using admin sdk)
  const decoded = await admin.auth().verifyIdToken(token);
  if (!decoded) {
    throw new ApiError(403, 'You are unauthorized!!!');
  } else if (!decoded.email) {
    throw new ApiError(404, 'Your email address not found!!!');
  }

  // get user location info
  const { countryName, countryCodeISO, currency } = getCountryByTimezone(timezone);

  // gender detection from name
  const gen = gender.detect(decoded.name);

  const data: Partial<IAppUser> = {
    fcmTokens: [fcmToken],
    fullName: decoded.name,
    imageUrl: decoded.picture || '',
    email: decoded.email,
    gender: gen,
    country: {
      name: countryName,
      code: countryCodeISO,
    },
    currency,
  };

  let createdUser: IAppUser;
  let accessToken: string;

  // check if user exists
  const userExists = await AppUser.findOne({ email: decoded.email });
  if (userExists) {
    const fcmTokens = [...new Set([...userExists.fcmTokens, fcmToken])];
    const country = {
      name: countryName,
      code: countryCodeISO,
    };

    userExists.fcmTokens = fcmTokens;
    userExists.country = country;
    userExists.currency = currency;

    await userExists.save();

    createdUser = userExists;
    accessToken = JwtHelper.createToken(
      { _id: userExists._id, role: userExists.role as IUserRoles },
      configs.jwt.secret as Secret,
      configs.jwt.user.expires_in as string
    );
  } else {
    createdUser = await AppUser.create(data);

    accessToken = JwtHelper.createToken(
      { _id: createdUser._id, role: createdUser.role as IUserRoles },
      configs.jwt.secret as Secret,
      configs.jwt.user.expires_in as string
    );
  }

  return {
    createdUser: pick(createdUser.toObject(), [
      'fcmTokens',
      'fullName',
      'imageUrl',
      'coverUrl',
      'email',
      'role',
      'gender',
      'age',
      'country',
      'currency',
      'interests',
      'isBanned',
    ]),
    accessToken,
  };
};

export const AppAuthService = {
  login,
};
