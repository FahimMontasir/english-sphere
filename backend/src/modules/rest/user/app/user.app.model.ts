import { Schema, model } from 'mongoose';
import { USER_ROLES } from '../../../../constants/roles';
import { IAppUser, IAppUserModel } from './user.app.interface';
import { GENDER } from '../../../../constants/gender';

const appUserSchema = new Schema<IAppUser>(
  {
    fcmToken: String,
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    coverUrl: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'user',
    },
    gender: {
      type: String,
      enum: GENDER,
      required: true,
    },
    age: Number,
    country: {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },
    currency: {
      type: String,
      required: true,
    },
    interests: [String],
    badges: [String],
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'AppUser' }],
  },
  {
    timestamps: true,
  }
);

export const CCUser = model<IAppUser, IAppUserModel>('AppUser', appUserSchema);
