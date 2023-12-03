
  import { IDecodedUser } from '../../../interfaces/user';
  import ApiError from '../../../errors/ApiError';
  import { Materials } from './materials.model';
  import { IMaterials } from './materials.interface';
  
  //? -----------------------------get-----------------------------
  const getMaterials = async (userId: string) => {
    const userData = await Materials.findById(userId).select('_id anyRef').lean();
  
    if (!userData) throw new ApiError(404, 'NOT FOUND');
  
    return userData;
  };
  
  //? -----------------------------add-----------------------------
  const addMaterials = async (payload: IMaterials): Promise<void> => {
    await Materials.create(payload);
  };
  
  //? ----------------------------update----------------------------
  const updateMaterials = async (decodedUser: IDecodedUser, payload: Partial<IMaterials>): Promise<void> => {
    const { _id } = decodedUser;
  
    await Materials.findByIdAndUpdate(_id, { $set: payload });
  };
  
  //? ----------------------------remove----------------------------
  const removeMaterials = async (value: string): Promise<void> => {
    await Materials.deleteOne({ anyRef: value });
  };
  
  export const MaterialsService = {
    getMaterials,
    addMaterials,
    updateMaterials,
    removeMaterials,
  };
  
