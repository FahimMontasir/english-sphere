import { Schema, model } from 'mongoose';
import { ICCUser, ICCUserModel } from './user.cc.interface';
import { Password } from '../../../../shared/password';
import { USER_ROLES } from '../../../../constants/roles';

const ccUserSchema = new Schema<ICCUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
  }
);

// this pre hook only works User.create() || user.save()
ccUserSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await Password.hash(this.password);

  next();
});

// static methods
ccUserSchema.statics.isPasswordMatched = async function (givenPassword, savedPassword) {
  return await Password.compare(givenPassword, savedPassword);
};

export const CCUser = model<ICCUser, ICCUserModel>('CCUser', ccUserSchema);
