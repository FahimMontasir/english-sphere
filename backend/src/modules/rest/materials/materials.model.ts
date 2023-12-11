import { Schema, model } from 'mongoose';
import {
  IMaterials,
  IMaterialsModel,
  IMaterialsCategoryModel,
  IMaterialsCategory,
  IMaterialsRequested,
  IMaterialsRequestedModel,
} from './materials.interface';
import { STATUS } from './materials.constant';

const materialsSchema = new Schema<IMaterials>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'MaterialsCategory',
      required: true,
    },
    status: {
      type: String,
      enum: STATUS,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Materials = model<IMaterials, IMaterialsModel>('Materials', materialsSchema);

const materialsCategorySchema = new Schema<IMaterialsCategory>(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MaterialsCategory = model<IMaterialsCategory, IMaterialsCategoryModel>(
  'MaterialsCategory',
  materialsCategorySchema
);

const materialsRequestedSchema = new Schema<IMaterialsRequested>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'AppUser',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'MaterialsCategory',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MaterialsRequested = model<IMaterialsRequested, IMaterialsRequestedModel>(
  'MaterialsRequested',
  materialsRequestedSchema
);
