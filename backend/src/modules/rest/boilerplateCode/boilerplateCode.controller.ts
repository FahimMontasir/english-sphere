
  import { catchAsync } from '../../../shared/catchAsync';
  import { sendResponse } from '../../../shared/sendResponse';
  import { BoilerplateCodeService } from './boilerplateCode.service';
  
  //? -----------------------------get-----------------------------
  const getBoilerplateCode = catchAsync(async (req, res) => {
    const data = await BoilerplateCodeService.getBoilerplateCode(req.params.userId);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Retrieved successfully!!!',
      data,
    });
  });
  
  //? -----------------------------add-----------------------------
  const addBoilerplateCode = catchAsync(async (req, res) => {
    await BoilerplateCodeService.addBoilerplateCode(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Added successfully!!!',
    });
  });
  
  //? ----------------------------update----------------------------
  const updateBoilerplateCode = catchAsync(async (req, res) => {
    await BoilerplateCodeService.updateBoilerplateCode(req.user, req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Updated successfully!!!',
    });
  });
  
  //? ----------------------------remove----------------------------
  const removeBoilerplateCode = catchAsync(async (req, res) => {
    await BoilerplateCodeService.removeBoilerplateCode(req.body.value);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Removed successfully!!!',
    });
  });
  
  export const BoilerplateCodeController = {
    getBoilerplateCode,
    addBoilerplateCode,
    updateBoilerplateCode,
    removeBoilerplateCode,
  };
  
