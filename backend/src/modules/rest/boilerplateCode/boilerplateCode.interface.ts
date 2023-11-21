
import { Model, Types } from 'mongoose';
import { SOME_CONSTANTS } from './boilerplateCode.constant';

export type ISomeConstant = (typeof SOME_CONSTANTS)[number];

export type IBoilerplateCode = {
  _id?: Types.ObjectId;
  anyRef: Types.ObjectId;
  removeIt: boolean;
  constant: ISomeConstant;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IBoilerplateCodeModel = {
  //? mongoose static methods type goes here...
} & Model<IBoilerplateCode>;

  