import { catchAsync } from 'shared/catchAsync';
import { sendResponse } from 'shared/sendResponse';
import { AppUserService } from './user.app.service';

// -------------------------------get-------------------------------

// ----------------------------------add----------------------------
const refreshFcmToken = catchAsync(async (req, res) => {
  await AppUserService.refreshFcmToken(req.user, req.body.fcmToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fcm token updated successfully!!!',
  });
});

const addSkill = catchAsync(async (req, res) => {
  await AppUserService.addSkill(req.user, req.body.value);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Skill added successfully!!!',
  });
});

// ---------------------------update--------------------------------
const updateUser = catchAsync(async (req, res) => {
  await AppUserService.updateUser(req.user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your info updated successfully!!!',
  });
});

// ------------------------------remove-----------------------------------
const removeSkill = catchAsync(async (req, res) => {
  await AppUserService.removeSkill(req.user, req.body.value);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your skill removed successfully!!!',
  });
});

const removeOtherUser = catchAsync(async (req, res) => {
  await AppUserService.removeOtherUser(req.user, req.body.device);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your skill removed successfully!!!',
  });
});

export const AppUserController = {
  refreshFcmToken,
  addSkill,
  updateUser,
  removeSkill,
  removeOtherUser,
};
