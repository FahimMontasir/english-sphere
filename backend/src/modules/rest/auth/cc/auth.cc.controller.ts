import { CookieOptions } from 'express';
import configs from '../../../../configs';
import { catchAsync } from '../../../../shared/catchAsync';
import { sendResponse } from '../../../../shared/sendResponse';
import { CCAuthService } from './auth.cc.service';

const register = catchAsync(async (req, res) => {
  await CCAuthService.register(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'You have successfully registered!',
  });
});

const login = catchAsync(async (req, res) => {
  const result = await CCAuthService.login(req.body);
  const { refreshToken, ...others } = result;

  //set refresh token into cookie
  const cookieOptions: CookieOptions = {
    secure: configs.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await CCAuthService.refreshToken(refreshToken);

  //set refresh token into cookie
  const cookieOptions: CookieOptions = {
    secure: configs.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Refresh token received successfully!',
    data: result,
  });
});

export const CCAuthController = {
  register,
  login,
  refreshToken,
};
