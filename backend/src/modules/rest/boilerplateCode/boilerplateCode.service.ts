
  import { IDecodedUser } from '../../../interfaces/user';
  import ApiError from '../../../errors/ApiError';
  import { BoilerplateCode } from './boilerplateCode.model';
  import { IBoilerplateCode } from './boilerplateCode.interface';
  
  //? -----------------------------get-----------------------------
  const getBoilerplateCode = async (userId: string) => {
    const userData = await BoilerplateCode.findById(userId).select('_id anyRef').lean();
  
    if (!userData) throw new ApiError(404, 'NOT FOUND');
  
    return userData;
  };
  
  //? -----------------------------add-----------------------------
  const addBoilerplateCode = async (payload: IBoilerplateCode): Promise<void> => {
    await BoilerplateCode.create(payload);
  };
  
  //? ----------------------------update----------------------------
  const updateBoilerplateCode = async (decodedUser: IDecodedUser, payload: Partial<IBoilerplateCode>): Promise<void> => {
    const { _id } = decodedUser;
  
    await BoilerplateCode.findByIdAndUpdate(_id, { $set: payload });
  };
  
  //? ----------------------------remove----------------------------
  const removeBoilerplateCode = async (value: string): Promise<void> => {
    await BoilerplateCode.deleteOne({ anyRef: value });
  };
  
  export const BoilerplateCodeService = {
    getBoilerplateCode,
    addBoilerplateCode,
    updateBoilerplateCode,
    removeBoilerplateCode,
  };
  
