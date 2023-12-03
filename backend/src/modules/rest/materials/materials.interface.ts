
import { Model, Types } from 'mongoose';
import { SOME_CONSTANTS } from './materials.constant';

export type ISomeConstant = (typeof SOME_CONSTANTS)[number];

export type IMaterials = {
  _id?: Types.ObjectId;
  anyRef: Types.ObjectId;
  removeIt: boolean;
  constant: ISomeConstant;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IMaterialsModel = {
  //? mongoose static methods type goes here...
} & Model<IMaterials>;

  