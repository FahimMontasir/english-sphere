import express from 'express';
import validateRequest from 'middlewares/rest/validateRequest';
import auth from 'middlewares/rest/auth';
import { AppUserValidation } from './user.app.validation';
import { AppUserController } from './user.app.controller';

const router = express.Router();

router.get('/updated-info', auth('user', 'userN'), AppUserController.getUpdatedInfo);

router.post(
  '/refresh-fcm-token',
  auth('user', 'userN'),
  validateRequest(AppUserValidation.refreshFcmTokenZodSchema),
  AppUserController.refreshFcmToken
);
router.post(
  '/add-skill',
  auth('user', 'userN'),
  validateRequest(AppUserValidation.addSkillZodSchema),
  AppUserController.addSkill
);

router.patch(
  '/update-user',
  auth('user', 'userN'),
  validateRequest(AppUserValidation.updateUserZodSchema),
  AppUserController.updateUser
);

router.delete(
  '/remove-skill',
  auth('user', 'userN'),
  validateRequest(AppUserValidation.removeSkillZodSchema),
  AppUserController.removeSkill
);
router.delete(
  '/remove-other-user',
  auth('user', 'userN'),
  validateRequest(AppUserValidation.removeFcmTokenZodSchema),
  AppUserController.removeOtherUser
);

export const AppUserRoutes = router;
