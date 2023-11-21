import { catchAsync } from '../../../../shared/catchAsync';
import { sendResponse } from '../../../../shared/sendResponse';
import { AppAuthService } from './auth.app.service';

const login = catchAsync(async (req, res) => {
  const result = await AppAuthService.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  await AppAuthService.logout(req.user, req.body.fcmDevice);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged out successfully',
  });
});

export const AppAuthController = {
  login,
  logout,
};
