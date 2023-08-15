import express from 'express';
import validateRequest from 'middlewares/rest/validateRequest';
import auth from 'middlewares/rest/auth';
import { AppUserValidation } from './user.app.validation';
import { AppUserController } from './user.app.controller';

const router = express.Router();

router.post(
  '/refresh-fcm-token',
  auth('user', 'userN'),
  validateRequest(AppUserValidation.refreshFcmTokenZodSchema),
  AppUserController.refreshFcmToken
);

export const AppUserRoutes = router;
