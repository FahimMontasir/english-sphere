
  import { Schema, model } from 'mongoose';
  import { IBoilerplateCode, IBoilerplateCodeModel } from './boilerplateCode.interface';
  import { SOME_CONSTANTS } from './boilerplateCode.constant';
  
  const boilerplateCodeSchema = new Schema<IBoilerplateCode>(
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
  
  export const BoilerplateCode = model<IBoilerplateCode, IBoilerplateCodeModel>('BoilerplateCode', boilerplateCodeSchema);
  
  