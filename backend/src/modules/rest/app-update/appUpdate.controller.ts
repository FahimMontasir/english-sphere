import { catchAsync } from 'shared/catchAsync';
import { sendResponse } from 'shared/sendResponse';
import { AppUpdateService } from './appUpdate.service';

const sendAll = catchAsync(async (req, res) => {
  await AppUpdateService.sendAll(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'App update send successfully!!!',
  });
});

const sendMulticast = catchAsync(async (req, res) => {
  await AppUpdateService.sendMulticast(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'App update send successfully-multicast!!!',
  });
});

export const AppUpdateController = {
  sendAll,
  sendMulticast,
};
