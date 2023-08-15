import { catchAsync } from 'shared/catchAsync';
import { sendResponse } from 'shared/sendResponse';
import { AppUserService } from './user.app.service';

const refreshFcmToken = catchAsync(async (req, res) => {
  await AppUserService.refreshFcmToken(req.user, req.body.fcmToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fcm token updated successfully!!!',
  });
});

export const AppUserController = {
  refreshFcmToken,
};
