import { Model, Document, Types } from 'mongoose';
import { IBadge, IGender, IUserRoles } from '../../../../interfaces/user';

export type IAppUser = Document & {
  fcmTokens: string[];
  fullName: string;
  imageUrl: string;
  coverUrl?: string;
  email: string;
  role?: IUserRoles;
  gender: IGender;
  age?: number;
  country: {
    name: string;
    code: string;
  };
  currency: string;
  interests?: string[];
  badges?: IBadge[];
  upVotes?: number;
  downVotes?: number;
  friends?: Types.ObjectId[];
  isBanned?: boolean;
};

export type IAppUserModel = {
  // mongoose static methods type...
} & Model<IAppUser>;
