
  import { catchAsync } from '../../../shared/catchAsync';
  import { sendResponse } from '../../../shared/sendResponse';
  import { MaterialsService } from './materials.service';
  
  //? -----------------------------get-----------------------------
  const getMaterials = catchAsync(async (req, res) => {
    const data = await MaterialsService.getMaterials(req.params.userId);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrieved successfully!!!',
      data,
    });
  });
  
  //? -----------------------------add-----------------------------
  const addMaterials = catchAsync(async (req, res) => {
    await MaterialsService.addMaterials(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Added successfully!!!',
    });
  });
  
  //? ----------------------------update----------------------------
  const updateMaterials = catchAsync(async (req, res) => {
    await MaterialsService.updateMaterials(req.user, req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Updated successfully!!!',
    });
  });
  
  //? ----------------------------remove----------------------------
  const removeMaterials = catchAsync(async (req, res) => {
    await MaterialsService.removeMaterials(req.body.value);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Removed successfully!!!',
    });
  });
  
  export const MaterialsController = {
    getMaterials,
    addMaterials,
    updateMaterials,
    removeMaterials,
  };
  
