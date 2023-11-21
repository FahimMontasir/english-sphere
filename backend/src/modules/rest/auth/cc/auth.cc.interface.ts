import { ICCUser } from '../../../../modules/rest/user/cc/user.cc.interface';

export type ICCLogin = {
  email: string;
  password: string;
};

export type ICCLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: ICCUser;
};

export type ICCChangePassword = {
  oldPassword: string;
  newPassword: string;
};
