import { Model, Document } from 'mongoose';
import { IUserRoles } from '../../../../interfaces/user';

export type ICCUser = Document & {
  name: {
    firstName: string;
    lastName: string;
  };
  imageUrl: string;
  email: string;
  role: IUserRoles;
  password: string;
};

export type ICCUserModel = {
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<ICCUser>;
