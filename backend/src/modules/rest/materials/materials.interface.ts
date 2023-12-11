import { Model, Types } from 'mongoose';
import { STATUS } from './materials.constant';

export type IStatus = (typeof STATUS)[number];

export type IMaterials = {
  _id?: Types.ObjectId;
  title: string;
  thumbnailUrl: string;
  coverUrl: string;
  description: string;
  status: IStatus;
  category: Types.ObjectId | IMaterialsCategory;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IMaterialsModel = {
  //? mongoose static methods type goes here...
} & Model<IMaterials>;

export type IMaterialsCategory = {
  _id?: Types.ObjectId;
  title: string;
  thumbnailUrl: string;
  coverUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IMaterialsCategoryModel = {
  //? mongoose static methods type goes here...
} & Model<IMaterialsCategory>;

export type IMaterialsRequested = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  description: string;
  category: Types.ObjectId | IMaterialsCategory;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IMaterialsRequestedModel = {
  //? mongoose static methods type goes here...
} & Model<IMaterialsRequested>;
