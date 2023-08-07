import express from 'express';
import validateRequest from 'middlewares/rest/validateRequest';
import auth from 'middlewares/rest/auth';
import { CCAuthValidation } from './auth.cc.validation';
import { CCAuthController } from './auth.cc.controller';

const router = express.Router();

router.post('/login', validateRequest(CCAuthValidation.loginZodSchema), CCAuthController.login);

router.post(
  '/register',
  auth('superAdmin', 'admin'),
  validateRequest(CCAuthValidation.registerZodSchema),
  CCAuthController.register
);

router.post(
  '/change-password',
  auth('superAdmin', 'admin', 'contentW'),
  validateRequest(CCAuthValidation.changePasswordZodSchema),
  CCAuthController.changePassword
);

router.post(
  '/refresh-token',
  auth('superAdmin', 'admin', 'contentW'),
  validateRequest(CCAuthValidation.refreshTokenZodSchema),
  CCAuthController.refreshToken
);

export const CCAuthRoutes = router;
