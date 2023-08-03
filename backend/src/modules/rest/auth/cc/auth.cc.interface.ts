import { ICCUser } from '../../user/cc/user.cc.interface';

export type ICCLogin = {
  email: string;
  password: string;
};

export type ICCLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: ICCUser;
};
