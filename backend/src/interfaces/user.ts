import { BADGES } from '../constants/badge';
import { GENDER } from '../constants/gender';
import { USER_ROLES } from '../constants/roles';

export type IUserRoles = (typeof USER_ROLES)[number];

export type IDecodedUser = {
  _id: string;
  role: IUserRoles;
  iat: number;
  exp: number;
};

export type IGender = (typeof GENDER)[number];

export type IBadge = (typeof BADGES)[number];
