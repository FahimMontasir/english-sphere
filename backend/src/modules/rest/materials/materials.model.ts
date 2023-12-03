
  import { Schema, model } from 'mongoose';
  import { IMaterials, IMaterialsModel } from './materials.interface';
  import { SOME_CONSTANTS } from './materials.constant';
  
  const materialsSchema = new Schema<IMaterials>(
    {
      anyRef: {
        type: Schema.Types.ObjectId,
        ref: 'anyRef',
      },
      constant: {
        type: String,
        enum: SOME_CONSTANTS,
      },
      removeIt: Boolean,
    },
    {
      timestamps: true,
    }
  );
  
  export const Materials = model<IMaterials, IMaterialsModel>('Materials', materialsSchema);
  
  